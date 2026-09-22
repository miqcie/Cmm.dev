# Papercuts

- 2026-09-21: pushing a commit that removed deploy.yml and touched wrangler.jsonc comments from a cloud session → auto-mode classifier denied `git push` three times as "DNS / Domain / Cert Changes"; chat approval did not reach it. Pushed from the Mac instead.
- 2026-09-21: killing the vite preview server with `pkill -f "vite preview"` → the pattern matched the calling shell and killed the whole command chain (exit 144) before the build ran.
- 2026-09-21: re-running a Playwright script in the scratchpad after a cwd reset → "Cannot find module 'playwright'" because node_modules lived only in the scratchpad and the shell cwd resets every call; cd in the same call.
- 2026-09-21: `git push --force-with-lease` to restart a merged branch → rejected because GitHub had auto-deleted the branch, so the lease had no ref to match; plain `git push -u` was the right call.
- 2026-09-22: flushing DNS after a Cloudflare domain move → `sudo` from the bash prompt has no TTY; osascript "with administrator privileges" worked.
- 2026-09-22: wrap-up step 6, adding a prevention rule to ~/.claude/CLAUDE.md → auto-mode classifier denied the Edit as "Instruction Poisoning"; Chris pasted the line by hand. Third classifier block this session (git push, CLAUDE.md edit, plus the standing rm rule): sanding target, now codified in CLAUDE.md.
- 2026-09-22: `open -t file.md` opened the default text editor → Chris wants iA Writer; rule added to CLAUDE.md and bd memory.
- 2026-09-22: chaining two commands with `;` per CLAUDE.md line 85 → PreToolUse hook rejected it ("One command per tool call"); the rule text is stale, hook now wants exactly one command. Tracked in bead chrismcconnell-52hx.
