package db

import (
	"context"
	"log"
	"os"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

const (
	hostKey     string = "DB_HOST"
	portKey     string = "DB_PORT"
	usernameKey string = "DB_USERNAME"
	passwordKey string = "DB_PASSWORD"
	database    string = "myweb"
)

func getClient() (*mongo.Client, context.Context, context.CancelFunc) {
	host := os.Getenv(hostKey)
	port := os.Getenv(portKey)
	username := os.Getenv(usernameKey)
	password := os.Getenv(passwordKey)
	var sb strings.Builder
	sb.WriteString("mongodb://")
	if username != "" && password != "" {
		sb.WriteString(username)
		sb.WriteString(":")
		sb.WriteString(password)
		sb.WriteString("@")
	}
	sb.WriteString(host)
	sb.WriteString(":")
	sb.WriteString(port)
	sb.WriteString("/")
	if username != "" && password != "" {
		sb.WriteString("?authSource=admin")
	}
	connectionURL := sb.String()
	log.Println("connectionURL =", connectionURL)
	client, err := mongo.NewClient(options.Client().ApplyURI(connectionURL))
	if err != nil {
		log.Panicln("Error: Failed to create database client")
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Panicln("Error: Failed to connect to database")
	}
	return client, ctx, cancel
}

func delClient(client *mongo.Client, ctx context.Context, cancel context.CancelFunc) {
	client.Disconnect(ctx)
	cancel()
}

func issueNextSeq(coll *mongo.Collection, ctx context.Context) interface{} {
	var updatedDoc bson.M
	filter := bson.D{{"_id", "seq"}}
	update := bson.D{{"$inc", bson.D{{"seq_num", 1}}}}
	opts := options.FindOneAndUpdate().SetUpsert(true)
	err := coll.FindOneAndUpdate(ctx, filter, update, opts).Decode(&updatedDoc)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Println("There was no document for _id=seq")
			return nil
		}
		log.Panicln(err)
	}
	return updatedDoc["seq_num"]
}

func Ping() bool {
	client, ctx, cancel := getClient()
	defer delClient(client, ctx, cancel)
	if client == nil {
		log.Println("No client for database")
		return false
	} else {
		err := client.Ping(ctx, readpref.Primary())
		if err != nil {
			log.Println("Failed to authenticate")
			log.Println(err)
			return false
		} else {
			log.Println("Succeed to connect")
			return true
		}
	}
}
