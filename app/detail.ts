/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData, Page, Observable, Http } from "@nativescript/core"

class DetailContext extends Observable {
    launchDetail
    launchString

    constructor(navigationContext) {
        super()
        this.launchDetail = navigationContext.launchDetail
        this.launchString = JSON.stringify(navigationContext.launchDetail, null, 4)
    }

    goBack(args) {
        const page = args.object.page as Page
        page.frame.goBack()
    }
}

export function pageLoaded(args: EventData) {
    const page = args.object as Page
    const ctx = page.navigationContext
    page.actionBarHidden = false
    page.bindingContext = new DetailContext(ctx)
}
