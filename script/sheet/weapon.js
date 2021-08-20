export class WeaponCharacterSheet extends ItemSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["vaesen", "sheet", "item"],
            template: "systems/vaesen/model/weapon.html",
            width: 400,
            height: 137,
            resizable: false
        });
    }

    _getHeaderButtons() {
        let buttons = super._getHeaderButtons();
        buttons = [
            {
                label: "Display",
                class: "display-chat",
                icon: "fas fa-comment",
                onclick: (ev) => this.sendToChat(this.item.data),
            }
        ].concat(buttons);
        return buttons;
    }

    getData() {
        const superData = super.getData();
        return superData;
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find("input").focusin(ev => this.onFocusIn(ev));
    }

    onFocusIn(event) {
        $(event.currentTarget).select();
    }

    sendToChat(data) {
        let message = "<b>" + data.name.toUpperCase() + "</b></br>" +
            "<b>" + game.i18n.localize("WEAPON.DAMAGE") + ": </b>" + data.data.damage + "</br>" +
            "<b>" + game.i18n.localize("WEAPON.RANGE") + ": </b>" + data.data.range + "</br>" +
            "<b>" + game.i18n.localize("WEAPON.BONUS") + ": </b>" + data.data.bonus + "</br>" +
            "<b>" + game.i18n.localize("WEAPON.AVAILABILITY") + ": </b>" + data.data.availability + "</br>" +
            "<b>" + game.i18n.localize("WEAPON.SKILL") + ": </b>" + data.data.skill + "</br>";
        let chatData = {
            user: game.user.id,
            content: message
        };
        ChatMessage.create(chatData, {});
    }
}
