package db

import (
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const accCollection string = "acc"

type Account struct {
	Id    int32    `bson:"_id,omitempty" json:"_id,string,omitempty"`
	Title string   `bson:"title,omitempty" json:"title,omitempty"`
	Url   string   `bson:"url,omitempty" json:"url,omitempty"`
	Uid   string   `bson:"uid,omitempty" json:"uid,omitempty"`
	Pwd   string   `bson:"pwd,omitempty" json:"pwd,omitempty"`
	Email string   `bson:"email,omitempty" json:"email,omitempty"`
	Alias []string `bson:"alias,omitempty" json:"alias,omitempty"`
	Memo  string   `bson:"memo,omitempty" json:"memo,omitempty"`
}

func AccFindAll() []Account {
	client, ctx, cancel := getClient()
	defer delClient(client, ctx, cancel)
	coll := client.Database(database).Collection(accCollection)
	document := bson.M{
		"_id": bson.D{{"$not", bson.D{{"$eq", "seq"}}}},
	}
	opts := options.Find().SetSort(bson.D{{"_id", 1}})
	cursor, err := coll.Find(ctx, document, opts)
	if err != nil {
		log.Println("Failed to find all - 1 ...")
		return nil
	}
	defer cursor.Close(ctx)
	var result []Account
	if err = cursor.All(ctx, &result); err != nil {
		log.Println("Failed to find all - 2 ...")
		return nil
	}
	return result
}

func AccInsertOne(acc Account) *mongo.InsertOneResult {
	client, ctx, cancel := getClient()
	defer delClient(client, ctx, cancel)
	coll := client.Database(database).Collection(accCollection)
	acc.Id = issueNextSeq(coll, ctx).(int32)
	result, err := coll.InsertOne(ctx, acc)
	if err != nil {
		log.Println("Failed to insert ...")
		return nil
	}
	return result
}

func AccUpdateOne(acc Account) *mongo.UpdateResult {
	client, ctx, cancel := getClient()
	defer delClient(client, ctx, cancel)
	coll := client.Database(database).Collection(accCollection)
	filter := bson.M{"_id": acc.Id}
	update := bson.M{"$set": acc}
	result, err := coll.UpdateOne(ctx, filter, update)
	if err != nil {
		log.Println("Failed to update one ...")
		return nil
	}
	return result
}

func AccDeleteOne(id int32) *mongo.DeleteResult {
	client, ctx, cancel := getClient()
	defer delClient(client, ctx, cancel)
	coll := client.Database(database).Collection(accCollection)
	document := bson.M{"_id": id}
	result, err := coll.DeleteOne(ctx, document)
	if err != nil {
		log.Println("Failed to delete")
		return nil
	}
	return result
}
