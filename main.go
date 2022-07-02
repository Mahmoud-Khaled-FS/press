package main

import (
	"encoding/json"
	"net/http"

	"github.com/Mahmoud-Khaled-FS/press/handler"
)



func main() {

	website := http.FileServer(http.Dir("./website"))

	http.Handle("/",website)

	http.HandleFunc("/score",func (w http.ResponseWriter , r *http.Request){
		if r.Method =="GET"{
			total := handler.GetData()
			w.WriteHeader(202)
			json.NewEncoder(w).Encode(total)
		}else if r.Method == "POST"{
			total := handler.PostScore(r)
			json.NewEncoder(w).Encode(total)
		}
	})
	http.ListenAndServe(":8080",nil)
}