const apiData = []

const fetchList = () => {

    const apiEndpoint = 'https://reqres.in/api/users/';

    // endpoint er den url jeg far data fra
    fetch(apiEndpoint)
    //response er serverns response til mig i fald det lykkes () at nå mit endpoint
    .then((response) => {
        if(response.status == 200) {
            return response.json();
        }
    })
    // data er det json jeg har returneret ud fra mit response
    .then((data) => {
        // console.log(data.articles);
        apiData.push(data.data);
    })
    // catch er hvis mit promise bliver rejected
    .catch((error) => {
        console.error(error);
    })
    .finally(() => {
        // er når alt foregående er lykkes
        // console.log("awega");

        apiData[0].map((list) => createCards(list));
        
    })

};

const createCards = (data) => {

    document.getElementById("product").innerHTML += `
    <figure class="card" >
    <img src=${data.avatar} alt=${data.first_name} >
    <article class="container" >
    <h2 class="name" > ${data.first_name} ${data.last_name} </h2>
    <p class="email" > ${data.email} </p>
    </article>
    </figure>
    `
}

fetchList();