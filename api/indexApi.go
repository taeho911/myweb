package api

import (
	"os"
	"log"
	"strconv"
	"net/http"
	"path/filepath"
)

var distPath string = filepath.Join(os.Getenv("HOME"), "www/myweb/static")

func indexEndpoints() {
	http.HandleFunc("/", rootHandler)
	http.HandleFunc("/index", indexHandler)
}

func fileServerEndpoints() {
	fs := http.FileServer(http.Dir(distPath))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
}

func Start(port int) {
	// Register endpoints
	// 정의되지 않은 endpoint에 대해서는 루트가 대응한다.
	// 예) /path/to/undefined/endpoint의 경우 /의 endpoint가 대응.
	indexEndpoints()
	addAccEndpoints()
	addMemoEndpoints()
	fileServerEndpoints()

	log.Println("http://localhost:" + strconv.Itoa(port))
	log.Println("File Server:", distPath)
	err := http.ListenAndServe(":" + strconv.Itoa(port), nil)
	if err != nil {
		log.Fatal(err)
	}
}

// func authenticated(next http.HandlerFunc) http.HandlerFunc {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		fmt.Println("isAuthenticated")
// 		next.ServeHTTP(w, r)
// 	})
// }

func rootHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("rootHandler")
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	http.Redirect(w, r, "/index", http.StatusFound)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("indexHandler")
	http.ServeFile(w, r, filepath.Join(distPath, "index.html"))
}