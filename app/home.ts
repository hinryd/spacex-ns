import { EventData, Page, Observable, Http, Button } from "@nativescript/core"
import { formatDistanceToNow, isFuture, formatRelative } from "date-fns"

interface Launch {
    name: string
    id: string
    date_utc: string
    date_local: string
    date_unix: number
}

class MainContext extends Observable {
    private launches: Launch[]

    constructor() {
        super()
        this.getLaunches()
    }

    private async getLaunches() {
        const res: Launch[] = await Http.getJSON("https://api.spacexdata.com/v4/launches")
        res.map(launch => {
            const date = Date.parse(launch.date_local)
            return Object.assign(
                launch,
                {
                    handler: args => {
                        const page = args.object.page as Page
                        page.frame.navigate({
                            moduleName: "detail",
                            context: { launchDetail: launch }
                        })
                    }
                },
                isFuture(date)
                    ? {
                          date_relative: "in " + formatDistanceToNow(date)
                      }
                    : {
                          date_relative: formatRelative(date, new Date())
                      }
            )
        })
        this.set("launches", res.reverse())
    }
}

export function pageLoaded(args: EventData) {
    const page = args.object as Page
    page.actionBarHidden = false
    page.bindingContext = new MainContext()
}
