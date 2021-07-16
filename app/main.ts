/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData, Page, Observable, Http } from "@nativescript/core"

class MainContext extends Observable {
    private launches = [{ name: "Downloading...", id: "", date_utc: "", date_local: "" }]

    constructor() {
        super()
        this.getLaunches()
    }

    private async getLaunches() {
        const res: any[] = await Http.getJSON("https://api.spacexdata.com/v4/launches")
        this.set("launches", res.reverse())
    }
}

export function navigatingTo(args: EventData) {
    const page = args.object as Page
    page.actionBarHidden = true
    page.bindingContext = new MainContext()
}
