import wretch from "wretch";
import { showAlert } from "../Components/UserAlert";

export enum ServiceName {
    SESSION_SERVICE = "session-service",
    SPEAKER_SERVICE = "speaker-service",
}

// these environment variables are only evaluated/available at build time
const serviceUrlMap: { [key in ServiceName]: string } = {
    [ServiceName.SESSION_SERVICE]: process.env.REACT_APP_SESSION_SERVICE ?? "http://localhost:8081",
    [ServiceName.SPEAKER_SERVICE]: process.env.REACT_APP_SPEAKER_SERVICE ?? "http://localhost:8082",
};

export function getRESTClient(serviceName: ServiceName) {
    // `wretch` is a thin wrapper around the `fetch` API available in most modern browsers
    return wretch(serviceUrlMap[serviceName]);
    // chain `.catcher` calls on `wretch()` to handle specific errors
    // .catcher(404, async (err) => {
    //     console.error("caught 404 error:", err);
    // })
    // .catcher(500, async (err) => {
    //     console.error("caught 500 error:", err);
    // });
}

// wretch().catcher(...) can't handle rejections due to no response from server
window.addEventListener("unhandledrejection", (event) => {
    const message = `caught error: ${event.reason}`;
    console.error(message);
    showAlert({ message, type: "danger" });
});
