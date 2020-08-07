let search = document.querySelector('input')
let list = document.querySelector('ul')
search.focus();
function debounce() {
    return new Promise(resolve => {
        let wait = setTimeout(() => {
            resolve("done");
        }, 500);
        input.addEventListener("input", () => {
            clearTimeout(wait);
        })
    });
}

async function searchPeople() {
    await debounce();
    let loading = document.createElement('p');
    loading.textContent = 'Loading...';
    list.appendChild(loading);
    fetch('https://swapi.dev/api/people/?search=' + input.value)
        .then(response => { return response.json(); })
        .then(result => {
            let ppl = result.results;
            if (ppl.length === 0)
                loading.textContent = 'No results.';
            else {
                for (let index = 0; index < ppl.length; index++) {
                    const res = document.createElement('li');
                    res.textContent = ppl[index].name;
                    list.appendChild(res);
                }
            }
        }).catch(e => { console.log('error' + e.message); });
}