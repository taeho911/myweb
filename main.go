package main

import (
	"flag"
	"myweb/api"
)

func main() {
	port := flag.Int("p", 80, "Port number")
	flag.Parse()
	api.Start(*port)
}
