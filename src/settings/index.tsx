import "../style/globals.css";
import {render} from "preact";
import {useEffect, useState} from "preact/hooks";
import {chromeSendMessage} from "./Chrome";
import {AdvancedSettings} from "./components/AdvancedSettings";
import {LoginForm} from "./components/LoginForm";
import {SettingsForm} from "./components/SettingsForm";

function App() {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [websocketStatus, setWebsocketStatus] = useState(0);

  useEffect(() => {
    chromeSendMessage("GET_WEBSOCKET_STATUS").then(response => {
      if (response && response.value !== undefined) {
        setWebsocketStatus(response.value);
      } else {
        console.error("Failed to get websocket status");
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-text-primary flex justify-center items-start py-8 px-4">
      <div className="w-96 max-w-full bg-surface border border-border rounded-lg shadow-sm p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-xl font-semibold">Extension Settings</h1>
          <p className="text-sm text-text-secondary">Manage your account and preferences.</p>
        </div>

        <div className="flex items-center justify-between rounded-md px-3 py-2 bg-surface-secondary border border-border">
          <span className="text-text-secondary">WebSocket</span>
          <span
            className="px-2 py-1 rounded-full text-xs font-medium"
            style={
              websocketStatus
                ? {background: "var(--color-accent-secondary)", color: "var(--color-background)"}
                : {background: "var(--color-border)", color: "var(--color-disabled)"}
            }>
            {websocketStatus ? "Connected" : "Disconnected"}
          </span>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="text-base font-medium">Login</h2>
          <div className="rounded-md p-4 bg-surface-secondary border border-border">
            <LoginForm />
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-base font-medium">Settings</h2>
          <div className="rounded-md p-4 bg-surface-secondary border border-border">
            <SettingsForm />
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium">Advanced</h2>
            <button
              type="button"
              className="text-sm text-blue-400 hover:text-blue-300"
              onClick={() => setAdvancedOpen(open => !open)}>
              {advancedOpen ? "Hide" : "Show"}
            </button>
          </div>
          {advancedOpen && (
            <div className="rounded-md p-4 bg-surface-secondary border border-border">
              <AdvancedSettings />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

render(<App />, document.getElementById("root") || document.body);
