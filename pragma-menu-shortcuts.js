class Shortcuts {

    constructor() {

    }
}

class PragmaMenuShortcuts extends Shortcuts {

    constructor(element) {

        super();

        this.element = element;
        this.children = element.querySelectorAll('a');
        this.first = this.children.length > 0 ? this.children[0] : null;
        this.last = this.children.length > 0 ? this.children[this.children.length - 1] : null;

        this.shortcuts = {
            "downArrow":40,
            "upArrow": 38,
            "home": 36,
            "end": 35
        };

        this.keyupHandler = this.keyup.bind(this);

    }

    init() {
        this.element.addEventListener("keyup", this.keyupHandler);
    }

    keyup(event) {

        switch(event.keyCode) {

            case this.shortcuts.downArrow:
                this.focusNextElement();
                break;
            case this.shortcuts.upArrow:
                this.focusPreviousElement();
                break;
            case this.shortcuts.home:
                this.focusFirstElement();
                break;
            case this.shortcuts.end:
                this.focusLastElement();
                break;
            default:
                break;
        }
    }

    focusFirstElement() {
        this.first.focus();
    }

    focusLastElement() {
        this.last.focus();
    }

    focusNextElement() {
        const anchors = this.convertToArray(this.children);
        const currentIndex = this.currentIndex();
        const nextIndex = currentIndex + 1;

        if((anchors.length > 0) && (nextIndex < anchors.length))
            anchors[nextIndex].focus();
        else
            this.first.focus();
    }

    focusPreviousElement() {
        const anchors = this.convertToArray(this.children);
        const currentIndex = this.currentIndex();
        const previousIndex = currentIndex - 1;

        if((anchors.length > 0) && (previousIndex >= 0))
            anchors[previousIndex].focus();
        else
            this.last.focus();
    }

    currentIndex() {
        const anchors = this.convertToArray(this.children);
        const selected = document.activeElement;

        return anchors.indexOf(selected);
    }

    convertToArray(nodeList) {
        return [].slice.call(nodeList);
    }
}