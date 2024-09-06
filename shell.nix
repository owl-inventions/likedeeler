let
  nixpkgs = builtins.fetchTarball {
    url    = "https://github.com/NixOS/nixpkgs/archive/refs/tags/23.11.tar.gz";
    sha256 = "1ndiv385w1qyb3b18vw13991fzb9wg4cl21wglk89grsfsnra41k";
  };

  pkgs = import nixpkgs { };

in
  pkgs.mkShell {
    buildInputs = [
      pkgs.nodejs_20
      pkgs.pre-commit
    ];
  }
