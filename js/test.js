// fields you are showing in the graphs // 
var selectedfields = ["TotaalAantalHaltJongeren_1", "TotaalMisdrijvenHalt_2", "GeweldsmisdrijvenHalt_3", "VernielingEnOpenbareOrdeHalt_4", "VermogensmisdrijvenHalt_5", "OverigeMisdrijvenHalt_6"] getData("https://opendata.cbs.nl/ODataApi/odata/71930ned/Perioden", drawButtons); getData("https://opendata.cbs.nl/ODataApi/odata/71930ned/TypedDataSet", showRecords); function getData(surl, callback) { $.ajax({ url: surl, method: 'GET', dataType: 'json', success: callback, error: function (requestObject, error, errorThrown) { console.log("error thrown, add handler to exit gracefully"); }, timeout: 3000 //to do: research and develop further in combination with error handling (bcontinue). }); }; //this functions draws the buttons and builds the UL elements ////////////////////////// function drawButtons(jsonrecordset) { //jsonrecordset or data var buttons = ""; var lists = ""; for(var i=0; i < jsonrecordset.value.length;i++) { buttons = "<button onClick=showData('" + jsonrecordset.value[i].Key + "')>" + jsonrecordset.value[i].Title + "</button>" + buttons; lists = lists + "<ul style='display:none;' id='PERIOD" + jsonrecordset.value[i].Key + "'><li>" + jsonrecordset.value[i].Key + "</li></ul>"; }; document.getElementById("buttons").innerHTML=buttons; document.getElementById("lists").innerHTML=lists; }; //this adds the LI (list items) to the UL with identifier "PERIOD + key" /////////////////////////// function showRecords(jsonrecordset) { var s = ""; var debug= 1000; for(var i=0; i < jsonrecordset.value.length;i++) { for (var key in jsonrecordset.value[i]) { if (jsonrecordset.value[i].hasOwnProperty(key)) { s = s+ "<li class='" + key + "'>" + jsonrecordset.value[i][key] + "</li>"; } } document.getElementById("PERIOD" + jsonrecordset.value[i].Perioden).innerHTML += s; s = ""; if (i==debug) { break; } } //this is where you could toggleClass, add a event listener or something similar to enable the buttons because showData can only work properly after the page has fully loaded// }; // continue to make more generic from here */ function showData (key) { var hundredpercent = 0; var listitems = $("#PERIOD" + key + ' li'); var associative = new Array; // var selectedfields = ["TotaalAantalHaltJongeren_1", "TotaalMisdrijvenHalt_2", "GeweldsmisdrijvenHalt_3" ,"VernielingEnOpenbareOrdeHalt_4", "VermogensmisdrijvenHalt_5", "OverigeMisdrijvenHalt_6"] //create subtotals and coerce string to number where applicable listitems.each(function() { if (associative.hasOwnProperty(this.className)) { associative[this.className] += 1 * (this.textContent); } else { associative[this.className] = 1 * (this.textContent); } }); hundredpercent = associative[selectedfields[0]]; $("#" + selectedfields[0]).animate({width: "100%" }); for (var i=1;i<selectedfields.length;i++) { /* yes i = 1 */ console.log(associative[selectedfields[i]]); /* debug values*/ //to print a label or legend with the actual values here ///// associative[selectedfields[i]] = (associative[selectedfields[i]] / hundredpercent) * 100; $("#" + selectedfields[i]).animate({width: associative[selectedfields[i]] + "%" }); } } 