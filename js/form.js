const sendBtn = document.getElementById( 'submitButton' );
const myForm = document.getElementById( 'contactForm' );
var errormsg = '';

function errors( obj, label, text, describedby ){
    var text = document.createTextNode( text );
    var required = document.createElement( 'span' );
    var span = document.createElement( 'span' );
    var parent = obj.length ? obj[0].parentNode : obj.parentNode;
    required.appendChild( span );
    span.appendChild( text );
    required.classList.add('required');
    required.classList.add('error-message' );
    parent.appendChild( required, obj );
    required.setAttribute( 'id', label );
    if (obj.length){
        obj[0].classList.add('required');
        obj[0].setAttribute( 'aria-invalid', true );
        obj[0].setAttribute( 'aria-descriedby', describedby + ' ' + label );
    } else {
        obj.classList.add('required');
        obj.setAttribute( 'aria-invalid', true );
        obj.setAttribute( 'aria-descriedby', describedby);
    }
}

// vérification de l'adresse email
function isEmail( mail ){
    const regMail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$','i');
    return regMail.test( mail );
}

function deleteErrors(arrayInput){
    arrayInput.forEach(element => {
        var node;
        element.removeAttribute('aria-required');
        element.classList.remove('required');
    });
    // efface le message de succès
    node = document.getElementById( 'submitSuccessMessage' );
    if (!node.classList.contains('d-none')) {
        node.classList.add('d-none');
    }
    // efface le message d'erreur
    node = document.getElementById('submitErrorMessage');
    if (!node.classList.contains('d-none')) {
        node.classList.add('d-none');
    }

    node = document.getElementById('errors');
    node.innerHTML = "";
}

function handleKeyPress(event) {
    if (event.keyCode === 9) {
        const elementsInForm = myForm.querySelectorAll('form [name]');

        if (elementsInForm.length) {
            let first = elementsInForm[0];
            let last = elementsInForm[elementsInForm.length - 1];
            let shift = event.shiftKey;
            if (shift) {
                if (event.target === first) { // shift-tab pressed on first input in dialog
                    last.focus();
                    event.preventDefault();
                }
            } else {
                if (event.target === last) { // tab pressed on last input in dialog
                    first.focus();
                    event.preventDefault();
                }
            }
        }
    }
}

sendBtn.addEventListener( 'click', ( event ) => {
    event.preventDefault();
    const nom = document.querySelector( '[name=\'name\']' );
    const email = document.querySelector( '[name=\'email\']' );
    const message = document.querySelector( '[name=\'message\']' );
    const successmessage = document.getElementById( 'submitSuccessMessage');

    const arrayInput = [nom, email, message];
    let errors = [];

    deleteErrors(arrayInput);

    if( !nom.value || !isEmail(email.value) || !message.value ){
        const msg = 'Ce champ est obligatoire';

        // Nom
        if( !nom.value ){
            nom.setAttribute('aria-invalid', true);
            errors.push(['Nom', msg]);
        } else if( nom.value ){
            nom.setAttribute('aria-invalid', false);
        }

        // Message
        if( !message.value ){
            message.setAttribute('aria-invalid', true);
            errors.push(['Message', msg]);
        }else if( message.value ){
            message.setAttribute('aria-invalid', false);
        }

        // Email
        if( !isEmail( email.value) ){
            email.setAttribute('aria-invalid', true);

            if( !email.value ) {
                errors.push(['E-mail', msg]);
            }
            else{
                errors.push(['E-mail', 'Saisissez une adresse e-mail valide.']);
            }
        } else {
            email.setAttribute('aria-invalid', false);
        }

        const errorMessage = document.getElementById('submitErrorMessage');
        const ul = document.getElementById('errors');
        errors.forEach((el) => {
            const li = document.createElement( 'li' );
            const text = document.createTextNode(el[0] + ' : ' + el[1]);
            li.appendChild(text);
            ul.appendChild(li);
        });

        errorMessage.appendChild(ul);
        errorMessage.classList.remove('d-none');

        document.title = 'Formulaire en erreur - Découvrez le Straw Berry : le téléphone éco-responsable accessible à tous ! - Straw Berry';
        document.querySelector('[aria-invalid="true"]').focus();
    }
    //Envois avec succès
    else{
        const successText = document.createTextNode('Votre message a bien été envoyé');

        successmessage.appendChild( successText );
        successmessage.classList.remove('d-none');

        //reset
        nom.value = '';
        email.value = '';
        message.value = '';
        successmessage.focus();
        document.title = 'Message envoyé avec succès - Découvrez le Straw Berry : le téléphone éco-responsable accessible à tous ! - Straw Berry';
    }

}, false );

const myModal = document.getElementById('feedbackModal')
const myInput = document.getElementById('name')

myModal.addEventListener('shown.bs.modal', () => {
    myInput.focus();
    window.addEventListener("keydown", handleKeyPress);
})

myModal.addEventListener('hidden.bs.modal', () => {
    window.removeEventListener("keydown", handleKeyPress);
})