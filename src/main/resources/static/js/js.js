function validar() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const cargo = document.getElementById("job").value;
  const departamento = document.getElementById("departamento").value;
  const telefone = document.getElementById("phone").value;
  const senha = document.getElementById("pass").value;

  if (
    email === "" ||
    email === null ||
    name === "" ||
    name === null ||
    cargo === "" ||
    cargo === null ||
    departamento === "" ||
    departamento === null ||
    telefone === "" ||
    telefone === null ||
    senha === "" ||
    senha === null
  ) {
    alert("Não pode haver espaços vazios");
  }
}

function validarcadastro() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const cargo = document.getElementById("cargo").value;
  const departamento = document.getElementById("departamento").value;
  const telefone = document.getElementById("phone").value;
  const senha = document.getElementById("pass").value;
  const confirmarsenha = document.getElementById("pass-confirm").value;

  if (
    email === "" ||
    email === null ||
    name === "" ||
    name === null ||
    cargo === "" ||
    cargo === null ||
    departamento === "" ||
    departamento === null ||
    telefone === "" ||
    telefone === null ||
    senha === "" ||
    senha === null ||
    confirmarsenha === "" ||
    confirmarsenha === null
  ) {
    alert("Não pode haver campos vazios");
  }

  if (senha !== confirmarsenha) {
    alert("Senhas incompatíveis");
  }
}

function PreviewImage() {
    let image =  document.getElementById("uploadImage").value
    document.getElementById("uploadPreview").src = image;
}

function date(data) {
  let dividir = data.split("-");
  let ano = dividir[0];
  let mes = dividir[1];
  let dia = dividir[2];
  return(`${dia}-${mes}-${ano}`);

}


           function checkCookie() {
              console.log(`The cookie is ${Cookies.get('userID')}`)
          }




function getMesa(places, id) {
      let result = places.filter(resp => resp.name == id.toUpperCase())
      createModal(result[0])
    }

    function createModal(place) {
      document.querySelector("#place_name").textContent += `Nome da mesa : ${place.name}`
     // document.querySelector("#placeID").placeholder = `${place.id}`
      document.querySelector("#placeID").value = place.id
      document.querySelector("#placeID").textContent += place.id
    //checkCookie()
      document.querySelector("#place_info").textContent += `Periféricos inclusos : ${place.perifericos.map(resp => {
        return ` ${resp} `
          })}`
          return getPlaceInfo(place)
          }

          function getPlaceInfo(name){
          return console.log(name.id)
          }



          function cleanModal() {
           document.querySelector(".place_info").textContent = ""
           document.querySelector(".place_data").textContent = ""

          }


          function padTo2Digits(num) {
          return num.toString().padStart(2, '0');
          }

          function formatDate(date) {
          return [
          date.getFullYear(),
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate() + 1),
          ].join('-');
          }

          function verify(e, reserva) {
          e.preventDefault();
          let date = e.target.fdate_reservation.value;
          const data = new Date(date);
          date = formatDate(data);
          console.log(" data " +  date)
          console.log(" reserva"+ reserva)


          reserva.map(resp => {
          resp.date.split(" ",1) == date ?
          (document.querySelector(`#${resp.mesa.name}`).classList.remove("place_empty"),
          document.querySelector(`#${resp.mesa.name}`).classList.add("place_kono"),
          document.querySelector(`#${resp.mesa.name}`).removeAttribute("data-bs-toggle"),
          document.querySelector(`#${resp.mesa.name}`).removeAttribute("data-bs-target"),
          cleanModal(),
          console.log(`equal ${resp.date} == ${date.split(" ",1)}  + ${resp.mesa.name}`)
          )
          :
          (document.querySelector(`#${resp.mesa.name}`).classList.remove("place_kono"),
          console.log("different" + resp.date.split(" ",1) + " == " + date),
          document.querySelector(`#${resp.mesa.name}`).classList.add("place_empty")
          )

          })
          }

          const verifyInfo = (e) =>{
            e.preventDefault();
            let dateInfo = e.target.date.value;
            let idPlace = e.target.placeID.value;

            let idUser = e.target.idUser.value;
            console.log(`data : ${dateInfo} e idLugar : ${idPlace} e idUsers : ${idUser}`)

            const data = {
              date : `${dateInfo}`,
              mesa : {
                id : idPlace
              },
              user : {
                id: idUser
              }
            }
            if(dateInfo == null || dateInfo.length == 0 ){
                alert("A data não pode ser nula")
                return
            }else{
                 console.log(`dados : ${JSON.stringify(data)}`)
                        createReserva(data)
            }


          }

          const createReserva = async (data) => {
            const url = "http://localhost:8087/reserva"

            const result = await fetch(url,
            {
              method: 'POST',
              headers: {
                  'Content-type': "application/json; charset=UTF-8",
                  "Access-Control-Request-Headers": "*",
                  "Access-Control-Request-Method": "*",
                  "Accept": "application/json"
              },
              body: JSON.stringify(data)
          })

          try{
            const content = await result.json();
            console.log(content);
            alert("Reserva criada com Sucesso hehehehehe")
            location.reload()
          }catch(e){
            alert("Erro ao criar reserva"+ e)
            location.reload()
          }

          }

           function padto2Digits(num) {
          return num.toString().padStart(2, '0');
          }

          function formatDateReserva(date) {
          return [
          padto2Digits(date.getDate() + 1),
          padto2Digits(date.getMonth() + 1),
          date.getFullYear()
          ].join('-');
          }
