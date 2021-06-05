package api

import (
	"log"
	"net/http"
	"path/filepath"
	// "encoding/json"
	// "myweb/db"
)

func addMemoEndpoints() {
	http.HandleFunc("/memo", memoHandler)
}

func memoHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("memoHandler")
	http.ServeFile(w, r, filepath.Join(distPath, "memo.html"))
}