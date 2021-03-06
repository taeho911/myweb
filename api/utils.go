package api

import (
	"io"
	"log"
	"io/ioutil"
	"net/http"
	"encoding/json"
)

func parseRequestBody(body io.ReadCloser, obj interface{}) (interface{}, error) {
	byteArr, err := ioutil.ReadAll(body)
	defer body.Close()
	if err != nil {
		return obj, err
	}
	err = json.Unmarshal(byteArr, &obj)
	if err != nil {
		return obj, err
	}
	return obj, nil
}

func writeEmptyJsonOnRes(w http.ResponseWriter) bool {
	data, err := json.Marshal("{}")
	if err != nil {
		log.Println("Failed to write empty json ...")
		return false
	}
	w.Write(data)
	return true
}


// reference ===========
// package main

// import (
// 	"encoding/json"
// 	"io/ioutil"
// 	"log"
// 	"net/http"
// )

// type Message struct {
// 	Id   int64  `json:"id"`
// 	Name string `json:"name"`
// }

// // curl localhost:8000 -d '{"name":"Hello"}'
// func Cleaner(w http.ResponseWriter, r *http.Request) {
// 	// Read body
// 	b, err := ioutil.ReadAll(r.Body)
// 	defer r.Body.Close()
// 	if err != nil {
// 		http.Error(w, err.Error(), 500)
// 		return
// 	}

// 	// Unmarshal
// 	var msg Message
// 	err = json.Unmarshal(b, &msg)
// 	if err != nil {
// 		http.Error(w, err.Error(), 500)
// 		return
// 	}

// 	output, err := json.Marshal(msg)
// 	if err != nil {
// 		http.Error(w, err.Error(), 500)
// 		return
// 	}
// 	w.Header().Set("content-type", "application/json")
// 	w.Write(output)
// }

// func main() {
// 	http.HandleFunc("/", Cleaner)
// 	address := ":8000"
// 	log.Println("Starting server on address", address)
// 	err := http.ListenAndServe(address, nil)
// 	if err != nil {
// 		panic(err)
// 	}
// }