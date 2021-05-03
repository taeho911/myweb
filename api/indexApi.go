package api

import (
	"os"
	"fmt"
	"log"
	"strconv"
	"net/http"
	"path/filepath"
)

var distPath string = filepath.Join(os.Getenv("PJTPATH"), "front/dist")

func indexEndpoints() {
	http.HandleFunc("/", rootHandler)
	http.HandleFunc("/index", indexHandler)
	// http.HandleFunc("/test", testHandler)
	// http.HandleFunc("/sample", authenticated(sampleHandler))
}

func fileServerEndpoints() {
	fs := http.FileServer(http.Dir(distPath))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	fmt.Println("File server:", distPath)
}

func Start(port int) {
	portStr := ":" + strconv.Itoa(port)
	fmt.Println("portStr:", portStr)
	fmt.Println("distPath:", distPath)

	// Register endpoints
	// 정의되지 않은 endpoint에 대해서는 루트가 대응한다.
	// 예) /path/to/undefined/endpoint의 경우 /의 endpoint가 대응.
	indexEndpoints()
	addAccEndpoints()
	fileServerEndpoints()

	err := http.ListenAndServe(portStr, nil)
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
	fmt.Println("rootHandler")
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	http.Redirect(w, r, "/index", http.StatusFound)
}

// func rootHandler(w http.ResponseWriter, r *http.Request) {
// 	fmt.Println("rootHandler")
// 	http.ServeFile(w, r, filepath.Join(distPath, "index.html"))
// }

func indexHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("indexHandler")
	http.ServeFile(w, r, filepath.Join(distPath, "index.html"))
}

// func testHandler(w http.ResponseWriter, r *http.Request) {
// 	fmt.Println("testHandler")
// 	fmt.Fprintf(w, "Test Endpoint")
// }

// func sampleHandler(w http.ResponseWriter, r *http.Request) {
// 	fmt.Println("sampleHandler")

// 	switch r.Method {
// 	case http.MethodGet:
// 		fmt.Println("GET")
// 	case http.MethodPost:
// 		fmt.Println("POST")
// 	case http.MethodPut:
// 		fmt.Println("PUT")
// 	case http.MethodDelete:
// 		fmt.Println("DELETE")
// 	default:
// 		fmt.Println("default")
// 	}
// }