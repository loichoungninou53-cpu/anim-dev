"use client"

// Source : emilkowalski/vaul (licence MIT). Installé avec : npm install vaul
import { Drawer } from "vaul"

export function VaulDrawerDemo() {
  return (
    <Drawer.Root>
      <Drawer.Trigger className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white">
        Ouvrir le tiroir
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/30" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md rounded-t-3xl bg-white p-6 outline-none">
          <Drawer.Title className="text-lg font-bold">Tiroir d'exemple</Drawer.Title>
          <Drawer.Description className="mt-2 text-sm text-foreground/70">Glisse vers le bas pour fermer.</Drawer.Description>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
