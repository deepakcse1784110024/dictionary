let input = document.querySelector("#input");
let searchbtn = document.querySelector("#search");
let notfound = document.querySelector(".not_found");
let defbox = document.querySelector(".def");
let audiobox = document.querySelector(".audio");
let loading = document.querySelector(".loading");




let apiKey = '11d541b3-28e5-4b03-a7c8-0c98d98d910c';

searchbtn.addEventListener('click', (e) => {
    e.preventDefault();

    //after the all logic some clear of the data for more efficiency
    audiobox.innerHTML = '';
    notfound.innerText = '';
    defbox.innerText = '';


    //get input data

    let word = input.value;

    //call api 

    if (word === '') {
        alert("word is required");
        return;
    }
    getData(word);

    //get data

    async function getData(word) {
        //API CALL
        loading.style.display = 'block';
        const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
        const data = await response.json();

        //empty result

        if (!data.length) {
            loading.style.display = 'none';

            notfound.innerText = 'no result found';
            return;
        }

        //if result is suggestions
        if (typeof data[0] === 'string') {
            loading.style.display = 'none';

            let heading = document.createElement('h3');
            heading.innerText = 'did you means';
            notfound.appendChild(heading);
            data.forEach(element => {
                let suggetion = document.createElement('span');
                suggetion.classList.add('suggested');
                suggetion.innerText = element;
                notfound.appendChild(suggetion);


            })

            return;
        }

        //result found
        loading.style.display = 'none';

        let defination = data[0].shortdef[0];
        defbox.innerText = defination;



        //sound
        const soundname = data[0].hwi.prs[0].sound.audio;
        if (soundname) {
            renderSound(soundname);
        }

    }

    function renderSound(soundname) {
        //https://media.merriam-webster.com/soundc11
        let subfolder = soundname.charAt(0);
        let soundsrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundname}.wav?key=${apiKey}`;
        let aud = document.createElement('audio');
        aud.src = soundsrc;
        aud.controls = true;
        audiobox.appendChild(aud);

    }

})