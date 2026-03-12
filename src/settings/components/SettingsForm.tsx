import {useEffect, useState} from "preact/compat";
import {SettingsRepository} from "../../common/repository/SettingsRepository";

export function SettingsForm() {
  const [serverAddress, setServerAddress] = useState("");
  const [ytEnabled, setYtEnabled] = useState(false);
  const [ytMusicEnabled, setYtMusicEnabled] = useState(false);
  useEffect(() => {
    SettingsRepository.getSettings().then(settings => {
      const {yt, ytmusic, serverAddress} = settings;
      setYtEnabled(yt);
      setYtMusicEnabled(ytmusic);
      setServerAddress(serverAddress);
    });
  }, []);

  function handleSave(event: Event) {
    event.preventDefault();
    const settings = {
      yt: ytEnabled,
      ytmusic: ytMusicEnabled,
      serverAddress: serverAddress,
    };
    SettingsRepository.saveSettings(settings);
  }
  return (
    <form onSubmit={handleSave} className="flex flex-col gap-4 text-sm text-text-primary">
      <div className="flex flex-col gap-2">
        <label className="flex items-center justify-between gap-3 px-3 py-2 rounded-md bg-surface border border-border">
          <span className="text-text-secondary">YouTube</span>
          <input
            type="checkbox"
            name="yt"
            checked={ytEnabled}
            onChange={e => setYtEnabled((e.target as HTMLInputElement).checked)}
            className="h-4 w-4  hover:cursor-pointer"
            style={{accentColor: "var(--color-accent-primary)"}}
          />
        </label>

        <label className="flex items-center justify-between gap-3 px-3 py-2 rounded-md bg-surface border border-border">
          <span className="text-text-secondary">YouTube Music</span>
          <input
            type="checkbox"
            name="ytmusic"
            checked={ytMusicEnabled}
            onChange={e => setYtMusicEnabled((e.target as HTMLInputElement).checked)}
            className="h-4 w-4  hover:cursor-pointer"
            style={{accentColor: "var(--color-accent-primary)"}}
          />
        </label>
      </div>

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
