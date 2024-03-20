document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.toolbox').forEach((el) => {
        new Toolbox(el);
    })
})


class Toolbox {
    constructor(element) {
        this.element = element;
        this.self = this;
        this.body = document.querySelector('body');

        this.toggleBtn = this.element.querySelector('#toolbox-toggle-btn');
        this.toggleBtn.addEventListener('click', this.toggleToolbox.bind(this, this.toggleBtn));

        this.titleToggleBtn = this.element.querySelector('#toolbox-title-toggle');
        this.titleToggleBtn.addEventListener('click', this.toggleShowTitleLevel.bind(this));

        this.altToggleBtn = this.element.querySelector('#toolbox-alt-toggle');
        this.altToggleBtn.addEventListener('click', this.toggleShowAlt.bind(this));

        this.body.addEventListener('click', () => {
            if (this.isOpen()) {
                this.toggleToolbox();
            }
        });

        this.element.addEventListener('click', (e) => {
            e.stopPropagation();
        })
    }

    isOpen() {
        return this.element.classList.contains('toolbox--open');
    }

    toggleToolbox() {
        this.toggleLabel(
            this.element,
            this.toggleBtn,
            'toolbox--open',
            'Ouvrir la boite à outils',
            'Fermer la boite à outils'
        );

        this.element.classList.toggle('toolbox--open');
    }

    toggleShowTitleLevel() {
        this.toggleLabel(
            this.body,
            this.titleToggleBtn,
            'toolboox--title-level',
            'Afficher la structure de titre',
            'Masquer la structure de titre'
        );

        this.body.classList.toggle('toolboox--title-level');
    }

    toggleShowAlt() {
        const alts = document.querySelectorAll('.toolbox--alt');

        this.toggleLabel(
            this.body,
            this.altToggleBtn,
            'toolboox--alt-images',
            'Afficher le texte alternatif des images',
            'Masquer le texte alternatif des images'
        );
        this.body.classList.toggle('toolboox--alt-images');

        if(alts.length > 0) {
            alts.forEach((alt) => {
                alt.parentElement.removeChild(alt);
            })

            return;
        }

        const images = document.querySelectorAll('img');
        images.forEach((image) => {
            const item = document.createElement('span');
            let altText = image.getAttribute('alt');

            if (altText === null) {
                altText = `<em>Pas de texte alternatif renseigné</em>`
            }

            if (altText.trim().length === 0) {
                altText = `<em>Texte alternatif vide</em>`
            }

            item.innerHTML = 'Texte alternatif : ' + altText;
            item.setAttribute('class', 'toolbox--alt');

            image.parentElement.appendChild(item);
        })
    }

    toggleLabel(el, btn, targetClass, labelEnable, labelDisable) {
        btn.innerHTML = labelDisable;
        if (el.classList.contains(targetClass)) {
            btn.innerHTML = labelEnable;
        }
    }
}

