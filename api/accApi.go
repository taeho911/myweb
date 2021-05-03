package api

import (
	"fmt"
	"net/http"
	"path/filepath"
	"encoding/json"
	"myweb/db"
)

func addAccEndpoints() {
	http.HandleFunc("/acc", accHandler)
	http.HandleFunc("/acc/list", accListHandler)
	http.HandleFunc("/acc/update", accUpdateHandler)
}

func accHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("accHandler")
	http.ServeFile(w, r, filepath.Join(distPath, "acc.html"))
}

func accListHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("accListHandler")
	result := db.FindAll()
	if result == nil {
		fmt.Println("Result is nil")
	}
	data, err := json.Marshal(result)
	if err != nil {
		fmt.Println("Failed to marshal result")
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
}

func accUpdateHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("accUpdateHandler")
	if r.Method == http.MethodPost {
		fmt.Println("POST request")
		acc, err := parseRequestBody(r.Body, new(db.Account))
		if err != nil {
			fmt.Println("ERROR")
		}
		fmt.Println(acc)
	} else {
		fmt.Println(r.Host, "sent not POST request ...")
	}
}