const pincode = document.getElementById("pincode");
const datepic = document.getElementById("date");
const search = document.getElementById("search");
const na = document.getElementById("name");
const loading = document.getElementById("load");
const container = document.getElementById("tb");
const tabel = document.getElementById("mytable");
var countCenters = document.getElementById("testdata");
var filterButton = document.getElementById("filter");
var viewFilters = document.getElementById("viewFilters");
tabel.style.display = "none";
var today = new Date();

const getVaccineData = (pincod, date) => {
  var pin = pincod;
  var date = date;

  loading.innerText = "Loading";
  return (
    fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" + pin +"&date=" + date)
      // Status Code
      
      .then((response) => {
        if (response.status !== 200) {
          tabel.style.display = "none";
          na.innerText = "Please Select Valied Pincode";
          lo.innerText = "";
        } else {
          na.innerText = " ";
        }
        return response.json();
      })

      .then((result) => {

        for (let x = 0; x < result.centers.length; x++) {
          const name_up = result.centers[x].name;
          const address_uphc = result.centers[x].address;
          const block_name = result.centers[x].block_name;
          const district_name = result.centers[x].district_name;
          const state_name = result.centers[x].state_name;
          const fee_ty = result.centers[x].fee_type;
          const date = result.centers[x].sessions[0].date;
          const newDiv = document.createElement("tr");
          newDiv.classList.add("pannel");
          //All Data
          var res = [
            date,
            name_up,
            address_uphc,
            block_name,
            district_name,
            state_name,
            fee_ty,
          ];
          m = result.centers[x].sessions[0];
          res.sort();
          for (let m = 0; m < res.length; m++) {
            var dup = res[m] + "span";
            console.log(dup);

            var dup = document.createElement("td");
            newDiv.appendChild(dup);
            var dupdata = document.createTextNode(res[m]);
            dup.appendChild(dupdata);
          }
          console.log(dup)

          var sess_data = [
            result.centers[x].sessions.length,
            m.vaccine,
            m.min_age_limit,
            m.available_capacity,
          ];

          console.log(sess_data);
          for (let m = 0; m < sess_data.length; m++) {
            var dup = sess_data[m] + "span";
            
            var dup = document.createElement("td");
            newDiv.appendChild(dup);
            var dupdata = document.createTextNode(sess_data[m]);
            dup.appendChild(dupdata);
          }
          console.log(dup,dupdata)
          container.append(newDiv);
          tabel.style.display = "";
        }
      })
  );
};

        
var auto_date = today.toISOString();
var mod_auto_date = auto_date.split("-");
var auto_year = mod_auto_date[0];
var auto_month = mod_auto_date[1];
var auto_day = mod_auto_date[2].split("");
var mod_auto_date = auto_day[0] + auto_day[1];
var final_auto_date = `${auto_year}-${auto_month}-${mod_auto_date}`;

//to select pincode
pincode.addEventListener("input", function () {
  if (pincode.value.length === 6) {
    console.log("change");
    var pin = pincode.value;
    if (pin === "") {
      na.innerText = "Please Provide PinCode";
      tabel.style.display = "none";
      return;
    }

    var dat = datepic.value || final_auto_date;
    if (dat === "") {
      na.innerText = "Please Provide Date";
    }
    var date_spli = dat.split("-");
    var modified_date = `${date_spli[2]}-${date_spli[1]}-${date_spli[0]}`;
    console.log("Modified-Date:" + modified_date);
    getVaccineData(pin, modified_date);
    //getVaccineDataByState(modified_date);
  } else {
    na.innerText = "";
    var Table = document.getElementById("tb");
    Table.innerHTML = "";
    tabel.style.display = "none";
  }
});

//to select date
datepic.addEventListener("input", function () {
  var Table = document.getElementById("tb");
  Table.innerHTML = "";
  if (pincode.value.length === 6) {
    console.log("change");
    var pin = pincode.value;
    if (pin === "") {
      na.innerText = "Please Provide PinCode";
      return;
    }

    var dat = datepic.value;
    console.log(dat);
    if (dat === "") {
      na.innerText = "Please Provide Date";
    }
    var date_chng = dat.split("-");
    var modified_date = `${date_chng[2]}-${date_chng[1]}-${date_chng[0]}`;
    console.log("Modified-Date:" + modified_date);
    getVaccineData(pin, modified_date);
   } 
  else {
    na.innerText = "";
    var Table = document.getElementById("tb");
    Table.innerHTML = "";
  }
});
      
