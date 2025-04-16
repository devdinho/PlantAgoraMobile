# 📱 PlantAgoraMobile

Projeto React Native com Expo. Este guia explica como instalar e configurar o ambiente Android no Fedora para rodar o projeto em um emulador ou dispositivo Android.

---

## 🚀 Pré-requisitos

- Node.js e npm (ou yarn)
- Git
- Emulador Android ou dispositivo físico
- Python (alguns pacotes do Expo CLI usam scripts com Python)
---

## 📦 Instalação do Android Studio e SDK

### 1. Baixar e instalar o Android Studio

- Acesse: [https://developer.android.com/studio](https://developer.android.com/studio)
- Baixe o arquivo `.zip` para Linux
- Extraia o conteúdo em uma pasta, por exemplo:  
  `~/android-studio`
- Acesse a pasta no terminal:
  ```bash
  cd ~/android-studio/bin
  ./studio.sh
  ```

### 2. Instalar o SDK e ferramentas

- Na primeira inicialização, selecione a instalação padrão ("Standard").
- O Android Studio instalará automaticamente:
  - Android SDK
  - `adb`
  - Emuladores
  - Ferramentas de build

### 3. Configurar variáveis de ambiente

1. Verifique o caminho do SDK:
   - No Android Studio:  
     `More Actions > SDK Manager`  
     Caminho padrão: `/home/user/Android/Sdk`

2. Adicione ao final do seu `~/.bashrc` ou `~/.zshrc`:

   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   ```

3. Recarregue o shell:
   ```bash
   source ~/.bashrc   # ou ~/.zshrc se estiver usando Zsh
   ```

---

## ✅ Verificação

Verifique se o `adb` está funcionando:

```bash
adb devices
```

Deve retornar algo como:

```
List of devices attached
```

---

## 🧑‍💻 Clonar e rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/devdinho/PlantAgoraMobile.git
cd PlantAgoraMobile
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Rodar no Android

Com um emulador aberto ou um celular conectado via USB com a depuração ativada:

```bash
npm run android
```

O Expo CLI será iniciado e abrirá automaticamente no dispositivo/emulador.

---

## 🐞 Problemas comuns

### `Error: spawn adb ENOENT`
O `adb` não foi encontrado. Certifique-se de que o Android SDK está instalado e as variáveis de ambiente foram configuradas corretamente.

### `Failed to resolve the Android SDK path`
O Expo não encontrou o SDK. Verifique se o caminho do SDK está correto em `ANDROID_HOME`.

---

## ✨ Dica

Para testar se tudo está instalado corretamente:

```bash
which adb
which emulator
echo $ANDROID_HOME
```

Se os caminhos forem exibidos, tá tudo certo!

---

## 📄 Licença

MIT © [devdinho](https://github.com/devdinho)