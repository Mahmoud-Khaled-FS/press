package handler

import (
	"encoding/json"
	"io/ioutil"

	"github.com/Mahmoud-Khaled-FS/press/models"
)

func GetData () (models.Score){
	var total models.Score		
	content,_ := ioutil.ReadFile("./data.json")
	json.Unmarshal(content,&total)
	return total
	// w.WriteHeader(202)
	// json.NewEncoder(w).Encode(total)
}