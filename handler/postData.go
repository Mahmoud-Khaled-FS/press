package handler

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/Mahmoud-Khaled-FS/press/models"
)

 func PostScore(r *http.Request) (models.Score) {
	var score models.Data
	body, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(body, &score)

	var total models.Score
	content, _ := ioutil.ReadFile("./data.json")
	json.Unmarshal(content, &total)

	total.Total += score.Score

	fileContent, _ := json.MarshalIndent(total, "", " ")

	ioutil.WriteFile("./data.json", fileContent, 0644)
	return total
}