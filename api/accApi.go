package api

import (
	"encoding/json"
	"log"
	"myweb/db"
	"net/http"
	"path/filepath"
)

func addAccEndpoints() {
	http.HandleFunc("/acc", accHandler)
	http.HandleFunc("/acc/list", accListHandler)
	http.HandleFunc("/acc/create", accCreateHandler)
	http.HandleFunc("/acc/update", accUpdateHandler)
	http.HandleFunc("/acc/delete", accDeleteHandler)
}

func accHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("accHandler")
	http.ServeFile(w, r, filepath.Join(distPath, "acc.html"))
}

func accListHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("accListHandler")
	result := db.AccFindAll()
	if result == nil {
		log.Println("Result is nil ...")
		return
	} else {
		data, err := json.Marshal(result)
		if err != nil {
			log.Println("Failed to marshal result :", err)
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(data)
	}
}

func accCreateHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("accCreateHandler")
	if r.Method == http.MethodPost {
		w.Header().Set("Content-Type", "application/json")
		tmpAcc, err := parseRequestBody(r.Body, new(db.Account))
		if err != nil {
			log.Println("Failed to parse request body :", err)
			writeEmptyJsonOnRes(w)
			return
		}
		acc := tmpAcc.(*db.Account)
		// result := db.InsertOne(tmp.Title, tmp.Url, tmp.Uid, tmp.Pwd, tmp.Email, tmp.Memo, tmp.Alias)
		result := db.AccInsertOne(*acc)
		if result == nil {
			log.Println("Failed to insert one ...")
			writeEmptyJsonOnRes(w)
			return
		} else {
			// insertedID, ok := result.InsertedID.(float64)
			// if !ok {
			// 	fmt.Println(result.InsertedID, "cannot be converted to float64")
			// 	writeEmptyJsonOnRes(w)
			// 	return
			// }
			acc.Id = result.InsertedID.(int32)
			data, err := json.Marshal(acc)
			if err != nil {
				log.Println("Failed to marshal data ...")
				writeEmptyJsonOnRes(w)
				return
			}
			w.Write(data)
		}
	} else {
		log.Println(r.Host, "sent not POST request ...")
	}
}

func accUpdateHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("accUpdateHandler")
	if r.Method == http.MethodPost {
		tmpAcc, err := parseRequestBody(r.Body, new(db.Account))
		if err != nil {
			log.Println("Failed to parse request body :", err)
			writeEmptyJsonOnRes(w)
			return
		}
		acc := tmpAcc.(*db.Account)
		result := db.AccUpdateOne(*acc)
		if result.ModifiedCount < 1 {
			log.Println("Failed to update >>> _id:", acc.Id)
			writeEmptyJsonOnRes(w)
			return
		}
		data, err := json.Marshal(acc)
		if err != nil {
			log.Println("Failed to marshal data ...")
			writeEmptyJsonOnRes(w)
			return
		}
		w.Write(data)
	} else {
		log.Println(r.Host, "sent not POST request ...")
	}
}

func accDeleteHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("accDeleteHandler")
	if r.Method == http.MethodDelete {
		tmpAcc, err := parseRequestBody(r.Body, new(db.Account))
		if err != nil {
			log.Println("Failed to parse request body :", err)
		}
		acc := tmpAcc.(*db.Account)
		result := db.AccDeleteOne(acc.Id)
		if result.DeletedCount < 1 {
			log.Println("Failed to delete ...")
			writeEmptyJsonOnRes(w)
			return
		}
		data, err := json.Marshal(acc)
		if err != nil {
			log.Println("Failed to marshal data ...")
			writeEmptyJsonOnRes(w)
			return
		}
		w.Write(data)
	} else {
		log.Println(r.Host, "sent not DELETE request ...")
	}
}
