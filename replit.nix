{pkgs}: {
  deps = [
    pkgs.chromium
    pkgs.alsa-lib
    pkgs.systemd
    pkgs.xorg.libxcb
    pkgs.expat
    pkgs.mesa
    pkgs.xorg.libXrandr
    pkgs.xorg.libXfixes
    pkgs.xorg.libXext
    pkgs.xorg.libXdamage
    pkgs.xorg.libXcomposite
    pkgs.xorg.libX11
    pkgs.dbus
    pkgs.cairo
    pkgs.pango
    pkgs.cups
    pkgs.at-spi2-atk
    pkgs.nspr
    pkgs.libxkbcommon
    pkgs.libdrm
    pkgs.nss
    pkgs.glib
  ];
}
