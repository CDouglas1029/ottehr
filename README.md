
## First Time Setup

To run Ottehr for the first time, you need to set up the project.


#### For Windows users:

We recommend using the Windows Subsystem for Linux (WSL) to run Ottehr on Windows. Follow these steps to set up WSL and install Node.js:

1.   Install **WSL** by following the official Microsoft guide: [Install WSL](https://learn.microsoft.com/en-us/windows/wsl/install)

2. Open your **WSL** terminal and follow the instructions below to install nvm and Node.js.

### Node Installation

To manage Node.js versions efficiently, we recommend using [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm#installing-and-updating).

1. Install nvm by following the instructions provided [here](https://github.com/nvm-sh/nvm#installing-and-updating).

2. Use nvm to install Node.js version 18 with the following commands:

    ```bash
    nvm install 18
    ```

3. Set Node.js version 18 as the default with:

    ```bash
    nvm alias default 18
    ```

After successful installation, verify the setup by executing:

```bash
node -v
```

This command should display the installed Node.js version.

### Installing `pnpm`

```bash
npm install -g pnpm@9
```

### Joining Oystehr

You'll need a free Oystehr account to run Ottehr. Register for access at [oystehr.com](https://oystehr.com). Follow these simple steps:

1. Visit [oystehr.com](https://oystehr.com).
2. Click on **Free Access** to initiate your early access request.

Once your request is received, the Oystehr team will promptly reach out to you via email, providing the credentials you need to kickstart your Oystehr journey.

For comprehensive guidance on getting started with Oystehr, explore our technical documentation available at [https://docs.oystehr.com](https://docs.oystehr.com).

## Setup Procedure

To proceed with this setup guide, it is assumed that you have access to a Oystehr project. If you have done so, please follow these steps:

1. **Fork Ottehr:**
   Visit [https://github.com/masslight/ottehr/fork](https://github.com/masslight/ottehr/fork) and fork the repository.

2. **Clone Your Fork:**
   Copy the SSH clone link of your fork and execute the following command in your preferred folder:

   ```bash
   git clone git@github.com:{your_profile}/ottehr.git
   ```

3. (Optional) **Add Ottehr as Upstream:**
   If desired, add the original Ottehr repository as an upstream remote:

   ```bash
   git remote add upstream git@github.com:masslight/ottehr.git
   ```

4. **Open Repository in Your Editor:**
   Open the repository in your chosen editor; for example, in VSCode:

   ```bash
   code .vscode/Ottehr.code-workspace
   ```

Before proceeding, ensure that you have Node.js v18.x and pnpm installed on your machine.

**For Windows users, make sure you have WSL set up and are running these commands in your WSL terminal.**

Once these dependencies are in place, enter the following command from the root directory.

```bash
sh scripts/ottehr-setup.sh
```

**note**: If you encounter an error on WSL/Ubuntu, try using bash instead of sh:
```bash
bash scripts/ottehr-setup.sh
```

The script will prompt you for the following information:

* Your access token: Log in to your Oystehr project on the [Oystehr Console](https://console.oystehr.com), and copy the access token from the dashboard
* Your project ID: Listed on the Oystehr Console next to the access token
* Your first provider email: This can be your email address

Once the program finishes running,

1. The Intake and EHR websites will open.
1. To log in to the EHR, enter the email you input during the setup program. Click `Forgot password?` and set a password then log in.

The URL for a test location is <http://localhost:3002/location/ak/in-person/prebook>.

## Scripts

```sh
pnpm <script name>
```

If a script is environment specific, use:

```sh
pnpm <script name>:<env>
```

### `telemed:start`

Starts Intake and EHR

### `build`

Builds all packages using the [build script](./scripts/build.sh).

### `lint`

Lints all packages using [ESLint](https://eslint.org/).

### `update`

Interactively updates all dependencies to their latest versions, respecting ranges specified in `package.json`.

## SendGrid Email Configuration

### Required Environment / Secrets
- SENDGRID_API_KEY
- TELEMED_SENDGRID_EMAIL_BCC
- TELEMED_SENDGRID_EMAIL_FROM
- TELEMED_SENDGRID_EMAIL_FROM_NAME
- TELEMED_SENDGRID_CONFIRMATION_EMAIL_TEMPLATE_ID
- TELEMED_SENDGRID_CANCELLATION_EMAIL_TEMPLATE_ID
- TELEMED_SENDGRID_VIDEO_CHAT_INVITATION_EMAIL_TEMPLATE_ID

**Example Confirmation Template:**
```html
<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <h2>You're confirmed!</h2>
    <p>Thanks for choosing Ottehr!</p><br>
    <p>Your check-in time for {{ firstName }} at {{ locationName }} is on {{ startTime }}.</p><br>
    <p>Please complete your paperwork in advance to save time at check-in. <a href="{{ paperworkUrl }}">Click here to complete paperwork</a></p><br>
    {{#notEquals appointmentType "walkin"}}
        <p><a href="{{ checkInUrl }}">Click here to modify/cancel your check-in</a></p><br>
    {{/notEquals}}
    <hr>
    <p>Thank you for choosing Ottehr. We look forward to partnering with you and your family.</p><br>
    <small>For questions or feedback, please <a target="_blank" href="https://www.ottehr.com/">Check out Ottehr</a></small>
</body>
</html>
```

**Example Cancellation Template:**
```html
<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <h2>Sorry to have you go!</h2>
    <p>Your appointment for {{firstName}} at {{locationName}} on {{startTime}} has been cancelled.</p><br>
    <p><a href="{{ locationUrl }}">Click here to book again</a></p><br>
    <hr>
    <p>Thank you for choosing Ottehr. We look forward to partnering with you and your family.</p><br>
    <small>For questions or feedback, please <a target="_blank" href="https://www.ottehr.com/">Check out Ottehr</a></small>
</body>
</html>
```

**Example Invitation Template:**
```html
<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <h2>You're Invited!</h2>
    <p>You have been invited to join an Ottehr visit with {{patientName}}.</p><br>
    <p><a href="{{ inviteUrl }}">Click here to join</a></p><br>
    <hr>
    <p>Thank you for choosing Ottehr. We look forward to partnering with you and your family.</p><br>
    <small>For questions or feedback, please <a target="_blank" href="https://www.ottehr.com/">Check out Ottehr</a></small>
</body>
</html>
```

## Theming & Localization
_At this time, dynamic theming and localization is only supported for the `telemed-intake` application._

### To theme your Ottehr `telemed-intake` app:
- Copy the files in `telemed-intake/app/src/theme/ottehr/` into a new folder, for example `telemed-intake/app/src/theme/myTheme`
- Update the theme environment variables to point to your new folders:
    ```bash
    THEME_PATH='/src/theme/myTheme'
    ```
- Modify the images, svgs, colors and translation files as needed
- Restart the app

