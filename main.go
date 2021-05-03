package main

import (
	"flag"
	"myweb/api"
)

func main() {
	port := flag.Int("p", 911, "Port number")
	flag.Parse()
	api.Start(*port)
}