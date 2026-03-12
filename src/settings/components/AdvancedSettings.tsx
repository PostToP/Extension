import {useEffect, useState} from "preact/compat";
import {SettingsRepository} from "../../common/repository/SettingsRepository";

export function AdvancedSettings() {
  const [serverAddress, setServerAddress] = useState("");

  useEffect(() => {
    SettingsRepository.getSettings().then(settings => {
      setServerAddress(settings.serverAddress);
    });
  }, []);

  async function handleSave(event: Event) {
    event.preventDefault();
    await SettingsRepository.setSetting("serverAddress", serverAddress);
    alert("Advanced settings saved.");
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-4 text-sm text-text-primary">
      <label className="flex flex-col gap-1">
        <span className="text-text-secondary">Server address</span>
        <input
          className="px-3 py-2 rounded-md bg-surface border border-border text-text-primary"
          type="text"
          value={serverAddress}
          onChange={e => setServerAddress((e.target as HTMLInputElement).value)}
          placeholder="e.g. 192.168.1.5:8001"
          required
        />
      </label>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center px-4 py-2 rounded-md text-sm font-medium bg-[var(--color-accent-primary)] text-[var(--color-background)]  hover:cursor-pointer">
          Save
        </button>
      </div>
    </form>
  );
}
