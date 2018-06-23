$(document).ready(function(){
    console.log("SYSTEM READY");

    var $body = $('body'); //Cache this for performance

            var setBodyScale = function() {
                var scaleSource = $body.width(),
                    scaleFactor = 0.1,                     
                    maxScale = 300,
                    minScale = 10; //Tweak these values to taste

                var fontSize = scaleSource * scaleFactor; //Multiply the width of the body by the scaling factor:

                if (fontSize > maxScale) fontSize = maxScale;
                if (fontSize < minScale) fontSize = minScale; //Enforce the minimum and maximums

                // $('body').css('font-size', fontSize + '%');
            }

            $(window).resize(function(){
                setBodyScale();
            });

            //Fire it when the page first loads:
            setBodyScale();

    $("#results").hide();
    $(".alert").hide();

    function calculateSalary(hourlyRate, hoursWorked, deductionPercent){
        let workStatus = "Full Time";
        let payPeriod = $('input[name="payPeriod"]:checked').val();
        let maritalStatus = $('input[name="maritalStatus"]:checked').val();
        let allowanceClaimed = $('#allowanceClaimed').val();
        let overtimeHours = (hoursWorked - 80);
        let deductionInput = $('input[name="beforeAfterTax"]:checked').val();
        
        
        if ( payPeriod === 'weekly' ){ overtimeHours = (hoursWorked - 40); }
        let weeklyFTPay = hourlyRate*40;
        let overTimePay = overtimeHours*hourlyRate*1.5;
        let biWeeklyFTPay = (weeklyFTPay*2);
        let payBeforeDeduction = weeklyFTPay + overTimePay;
        let deductions = payBeforeDeduction*(deductionPercent/100);

        if ( deductionInput === undefined )
            { deductions = 0 }
  
        let weeklyPay = (payBeforeDeduction - deductions);
        let biWeeklyPay = ((weeklyFTPay*2) + overTimePay).toFixed(2);
        let monthlyPay = (weeklyFTPay*4).toFixed(2);
        let totalAllowance = (allowanceClaimed*79.8).toFixed(2);
        let amtSubjectToWithholding = (biWeeklyPay - totalAllowance);
        let annualPay = (weeklyFTPay*52).toFixed(2);
        let weeklyWithheldTax = 0;
        

if ( maritalStatus === "single" ){
    // Choose Tax Brackets based on Weekly Pay to calculate Taxes for Singles
    if ( amtSubjectToWithholding > 71 && amtSubjectToWithholding < 254 ){
        let taxableIncome = (amtSubjectToWithholding - 71);
            weeklyWithheldTax = taxableIncome*0.1;
    } else if ( amtSubjectToWithholding > 254  && amtSubjectToWithholding < 815 ){
        let taxableIncome = (amtSubjectToWithholding - 254);
            weeklyWithheldTax = (taxableIncome*0.12) + 18.30;
    } else if ( amtSubjectToWithholding > 815  && amtSubjectToWithholding < 1658 ){
        let taxableIncome = (amtSubjectToWithholding - 815);
            weeklyWithheldTax = (taxableIncome*0.22) + 85.62;
    } else if ( amtSubjectToWithholding > 1658  && amtSubjectToWithholding < 3100 ){
        let taxableIncome = (amtSubjectToWithholding - 1658);
            weeklyWithheldTax = (taxableIncome*0.24) + 271.08;
    } else if ( amtSubjectToWithholding > 3100  && amtSubjectToWithholding < 3917 ){
        let taxableIncome = (amtSubjectToWithholding - 3100);
            weeklyWithheldTax = (taxableIncome*0.32) + 617.16;
    }  else if ( amtSubjectToWithholding > 3917  && amtSubjectToWithholding < 9687 ){
        let taxableIncome = (amtSubjectToWithholding - 3917);
            weeklyWithheldTax = (taxableIncome*0.35) + 878.6;
    } else if ( amtSubjectToWithholding > 9687 ){
        let taxableIncome = (amtSubjectToWithholding - 9687);
            weeklyWithheldTax = (taxableIncome*0.37) + 2898.10;
    } else {
            weeklyWithheldTax = 0;
    }

    } else if ( maritalStatus === "married") { 
        // Choose Tax Brackets based on Weekly Pay to calculate Taxes for Married
        if ( amtSubjectToWithholding > 222 && amtSubjectToWithholding < 588 ){
            let taxableIncome = (amtSubjectToWithholding - 222);
                weeklyWithheldTax = (taxableIncome*0.1);
        } else if ( amtSubjectToWithholding > 588  && amtSubjectToWithholding < 1711 ){
            let taxableIncome = (amtSubjectToWithholding - 588);
                weeklyWithheldTax = (taxableIncome*0.12) + 36.60;
        } else if ( amtSubjectToWithholding > 1711  && amtSubjectToWithholding < 3395 ){
            let taxableIncome = (amtSubjectToWithholding - 1711);
                weeklyWithheldTax = (taxableIncome*0.22) + 171.36;
        } else if ( amtSubjectToWithholding > 3395  && amtSubjectToWithholding < 6280 ){
            let taxableIncome = (amtSubjectToWithholding - 3395);
                weeklyWithheldTax = (taxableIncome*0.24) + 541.84;
        } else if ( amtSubjectToWithholding > 6280  && amtSubjectToWithholding < 7914 ){
            let taxableIncome = (amtSubjectToWithholding - 6280);
                weeklyWithheldTax = (taxableIncome*0.32) + 1234.24;
        } else if ( amtSubjectToWithholding > 7914  && amtSubjectToWithholding < 11761 ){
            let taxableIncome = (amtSubjectToWithholding - 7914);
                weeklyWithheldTax = (taxableIncome*0.35) + 1757.12;
        } else if ( amtSubjectToWithholding > 11761 ) {
            let taxableIncome = (amtSubjectToWithholding - 11761);
                weeklyWithheldTax = (taxableIncome*0.37) + 3103.57;
        } else { weeklyWithheldTax = 0; }
        
    }

    let weeklyPayAfterTax = weeklyPay - weeklyWithheldTax;

    if (deductionInput === "After Tax") {
        deductions = weeklyPayAfterTax*(deductionPercent/100);
        weeklyPayAfterTax = weeklyPayAfterTax - deductions;
    }

    let biWeeklyPayAfterTax = (weeklyPayAfterTax*2).toFixed(2);
    let biWeeklyTax = (weeklyWithheldTax*2).toFixed(2);
    let biWeeklyDeduction = (deductions*2).toFixed(2);

        // let monthlyTax = (biWeeklyTax*2).toFixed(2);
        // let monthlyPayAfterTax = (biWeeklyPayAfterTax*2).toFixed(2);
        // let annualPayAfterTax = (monthlyPayAfterTax*12).toFixed(2);
        // let annualTax = (monthlyTax*12).toFixed(2);

        console.log(deductionInput);
        console.log(payBeforeDeduction, deductions);
        console.log(payPeriod, "Pay Period");
        console.log(maritalStatus, "with" , allowanceClaimed, "Allowance Claimed");
        console.log("Huurly Rate: "+ hourlyRate);
        console.log("Hours Worked: "+ hoursWorked);
        console.log("Overtime Hours: "+ overtimeHours);
        console.log("Overtime Pay: "+ overTimePay);
        console.log("Weekly FT Pay: "+ weeklyFTPay);
        console.log("BiWeekly FT Pay: "+ biWeeklyFTPay);
        console.log("BiWeekly Pay: "+ biWeeklyPay);
        console.log("Weekly Pay: "+ weeklyPay);
        console.log("Monthly Pay: "+ monthlyPay);
        console.log("Annual Pay: " + annualPay);
        console.log(deductions, deductionPercent, "Deduction & Deduction %");
        console.log("Total Deduction: ", biWeeklyDeduction);
        console.log("Weekly Withheld Tax ", weeklyWithheldTax);
        console.log("BiWeekly Tax: ", biWeeklyTax);
        console.log("Weekly Pay After Tax ", weeklyPayAfterTax);
        console.log("Bi-Weekly Pay After Tax ", biWeeklyPayAfterTax);
        console.log('=======================================================================');
        console.log('=======================================================================');

    // set work status in report
    if (hoursWorked < 40){  workStatus = "Part Time" }

        // Round to 2 Decimal Places
        biWeeklyFTPay = biWeeklyFTPay.toFixed(2);
        overTimePay = overTimePay.toFixed(2);
        let numeroUNO = numeral(biWeeklyFTPay).format('0,0');
        console.log(numeroUNO);
    // Render result to web page
    $("#results").html(`
        <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Income Analysis</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Hourly Rate</td>
      <td>$${hourlyRate}</td>
    </tr>
    <tr>
      <td>Hours Worked</td>
      <td>${hoursWorked}</td>
    </tr>
    <tr>
        <td>Work Status</td>
        <td>${workStatus}</td>
    </tr>
    <tr>
    <td>Full Time Pay</td>
    <td>$${numeral(biWeeklyFTPay).format('0,0')}</td>
    </tr>
    <tr>
    <td>Overtime Pay</td>
    <td>$${numeral(overTimePay).format('0,0')}</td>
  </tr>
  <tr>
  <td>Gross Pay</td>
  <td>$${numeral(biWeeklyPay).format('0,0')}</td>
</tr>
<tr>
<td>Tax Deductions</td>
<td>$${numeral(biWeeklyTax).format('0,0')}</td>
</tr>
<tr>
<td>After Tax Pay</td>
<td>$${numeral(biWeeklyPayAfterTax).format('0,0')}</td>
</tr>
<tr>
<td>Total Deductions</td>
<td>$${numeral(biWeeklyDeduction).format('0,0')}</td>
</tr>
<tr>
<td>Annual Income</td>
<td>$${numeral(annualPay).format('0,0')}</td>
</tr>
  </tbody>
</table>
        `);
    }

// End of CalcSalary Function ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// Add listener to calculate button to calculate and render results
    $("#magic").on("click", function(){
        // Save input values in variables
        let hoursWorked = $("#hoursWorked").val();
        let hourlyRate = $("#hourlyRate").val();
        let deductionPercent = $('.deduction').val();
           
// Form Validation
        if (hourlyRate === ""){
            $("#hourlyRate").toggleClass("animated shake");
        }  else if (hoursWorked === ""){
            $("#hoursWorked").toggleClass("animated shake");
        }  else if (allowanceClaimed === ""){
            $("#allowanceClaimed").toggleClass("animated shake");
        }  else if ( maritalStatus = undefined ){
            $(".alert").show();
        }  else 
        
        {
            $(".alert").hide();
            $("#results").show();

            // Call function to calculate income
            calculateSalary(hourlyRate, hoursWorked, deductionPercent);
            // console.log("Deduction of", deductionPercent + "%");
            
            // Clear form fields
            $("#hoursWorked").val("");
            $("#hourlyRate").val("");
            $('#allowanceClaimed').val("");
            $('.deduction').val("");
        }

});

// Set Listener on deductions link to create form for deductions
$(".addInputBox").on("click", function (){
    let entryForm = $('#deductionsDiv');
    let newInputDiv = $('<div>').addClass('col');
    let beforeTaxCheckDiv = $('<div>').addClass('form-check form-check-inline');
    let afterTaxCheckDiv = $('<div>').addClass('form-check form-check-inline');
    let beforeTaxLabel = $('<label>').addClass('form-check-label').text('Before Tax');
    let afterTaxLabel = $('<label>').addClass('form-check-label').text('After Tax');
    let deductionBox = $('<input>').addClass('form-control deduction').attr('placeholder', 'Enter Deduction %');
    let beforeTaxInput = $('<input>').addClass('form-check-input beforeTax').attr('type', 'radio').attr('name', 'beforeAfterTax').attr('value', 'Before Tax');
    let afterTaxInput = $('<input checked>').addClass('form-check-input afterTax').attr('type', 'radio').attr('name', 'beforeAfterTax').attr('value', 'After Tax');
    let beforeTaxCheckBox = beforeTaxCheckDiv.append(beforeTaxInput).append(beforeTaxLabel);  
    let afterTaxCheckBox = afterTaxCheckDiv.append(afterTaxInput).append(afterTaxLabel);
    let newFieldBox = newInputDiv.append(deductionBox);
    let removeDeductionButton = $('<button>').addClass('removeDeduction btn btn-outline-danger btn-sm').text("x");
    newInputDiv.append(beforeTaxCheckBox);
    newInputDiv.append(afterTaxCheckBox);
    newInputDiv.append(removeDeductionButton);
    entryForm.append(newFieldBox);
})
});
    
// 7%, 4% and 8.4%