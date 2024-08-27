document.addEventListener("DOMContentLoaded", () => {
  const userId = document.getElementById("userId");
  const userName = document.getElementById("userName");
  const nickname = document.getElementById("nickname");
  const telecom = document.getElementById("telecom");
  const phoneNumber = document.getElementById("phoneNumber");
  const auth = document.getElementById("auth");
  const confirmBtn = document.getElementById("confirmBtn");
  const authInput = document.getElementById("authInput");
  const submitBtn = document.getElementById("submitBtn");
  const idCheck = document.getElementById("idCheck");
  const userNameCheck = document.getElementById("userNameCheck");
  const nicknameCheck = document.getElementById("nicknameCheck");
  const agreeAllCheckbox = document.querySelector('input[name="favor1"]');
  const otherCheckboxes = document.querySelectorAll(
    'input[name^="favor"]:not([name="favor1"])'
  );
  let sentAuthCode = "";

  function validateForm() {
    let isValid = true;
    let errorMessages = [];

    // Validate User ID
    const userIdValue = userId.value;
    const userIdRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,16}$/i;
    if (!userIdRegex.test(userIdValue)) {
      errorMessages.push(
        "User ID는 영소문자와 숫자를 포함해야 하며, 길이는 8자에서 16자 사이여야 합니다."
      );
      isValid = false;
    }

    // Validate Username
    const userNameValue = userName.value;
    const userNameRegex = /^[가-힣]{2,10}$/;
    if (!userNameRegex.test(userNameValue)) {
      errorMessages.push(
        "Username은 한글만 포함되어야 하며, 길이는 2자에서 10자 사이여야 합니다."
      );
      isValid = false;
    }

    // Validate Nickname
    const nicknameValue = nickname.value;
    const nicknameRegex = /^(?=.*[a-zA-Z가-힣])[a-zA-Z가-힣0-9]*$/;
    if (!nicknameRegex.test(nicknameValue)) {
      errorMessages.push(
        "Nickname은 한글 또는 영문자를 반드시 포함해야 하며, 숫자는 포함해도 되고 포함하지 않아도 됩니다."
      );
      isValid = false;
    }

    // Validate Telecom and Phone Number
    const telecomValue = telecom.value;
    const phoneNumberValue = phoneNumber.value;
    const isPhoneNumberValid =
      phoneNumberValue.startsWith("010") &&
      phoneNumberValue.length === 11 &&
      /^[0-9]+$/.test(phoneNumberValue);
    if (telecomValue === "") {
      errorMessages.push("통신사를 선택하세요.");
      isValid = false;
    } else if (!isPhoneNumberValid) {
      errorMessages.push(
        "핸드폰 번호는 010으로 시작하는 11자리 숫자여야 합니다."
      );
      isValid = false;
    }

    // Validate Auth Code
    const enteredAuthCode = authInput.value;
    if (enteredAuthCode !== sentAuthCode) {
      errorMessages.push("인증번호를 다시 확인해주세요.");
      isValid = false;
    }

    // Check if all checkboxes are checked
    const allCheckboxesChecked = Array.from(otherCheckboxes).every(
      (checkbox) => checkbox.checked
    );
    if (!agreeAllCheckbox.checked || !allCheckboxesChecked) {
      errorMessages.push("모든 약관에 동의해야 합니다.");
      isValid = false;
    }

    // Display error messages
    if (!isValid) {
      alert(errorMessages.join("\n"));
    }

    return isValid;
  }

  auth.addEventListener("click", () => {
    const phoneNumberValue = phoneNumber.value;
    const isValid =
      phoneNumberValue.startsWith("010") &&
      phoneNumberValue.length === 11 &&
      /^[0-9]+$/.test(phoneNumberValue);

    if (telecom.value == "") {
      alert("통신사를 선택하세요");
    } else if (!isValid) {
      alert("핸드폰 번호는 010으로 시작하는 11자리 숫자여야 합니다");
    } else {
      fetch("http://127.0.0.1:5500/js_jason/01_validation/json/authCodes.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const authCodes = data.authCodes;
          sentAuthCode =
            authCodes[Math.floor(Math.random() * authCodes.length)];
          alert(`인증 번호를 전송하였습니다: ${sentAuthCode}`);
        })
        .catch((error) => {
          console.error("Error fetching auth codes:", error);
        });
    }
  });

  confirmBtn.addEventListener("click", () => {
    const enteredAuthCode = authInput.value;
    if (enteredAuthCode === sentAuthCode) {
      alert("인증 성공!");
      document.getElementById("confirmStatus").textContent = "Auth completed!";
    } else {
      alert("인증번호를 다시 확인해주세요");
    }
  });

  idCheck.addEventListener("click", () => {
    const userIdValue = userId.value;
    const userIdRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,16}$/i;
    if (!userIdRegex.test(userIdValue)) {
      alert(
        "User ID는 영소문자와 숫자를 포함해야 하며, 길이는 8자에서 16자 사이여야 합니다."
      );
      userId.value = "";
    } else {
      alert("알맞은 아이디입니다.");
    }
  });

  userNameCheck.addEventListener("click", () => {
    const userNameValue = userName.value;
    const userNameRegex = /^[가-힣]{2,10}$/;
    if (!userNameRegex.test(userNameValue)) {
      alert(
        "Username은 한글만 포함되어야 하며, 길이는 2자에서 10자 사이여야 합니다."
      );
      userName.value = "";
    } else {
      alert("조건에 맞는 이름입니다.");
    }
  });

  nicknameCheck.addEventListener("click", () => {
    const nicknameValue = nickname.value;
    const nicknameRegex = /^(?=.*[a-zA-Z가-힣])[a-zA-Z가-힣0-9]*$/;
    if (!nicknameRegex.test(nicknameValue)) {
      alert(
        "Nickname은 한글 또는 영문자를 반드시 포함해야 하며, 숫자는 포함해도 되고 포함하지 않아도 됩니다."
      );
      nickname.value = "";
    } else {
      alert("알맞은 nickname입니다.");
    }
  });

  agreeAllCheckbox.addEventListener("change", () => {
    const isChecked = agreeAllCheckbox.checked;
    otherCheckboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
  });

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (validateForm()) {
      // If form is valid, you can submit the form or perform any other action
      alert("Form submitted successfully!");
    }
  });
});
