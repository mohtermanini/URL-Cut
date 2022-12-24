$(document).ready(function () {
    "use strict";
    let copyBtn;
    let tooltips;
    let init = () => {
        let tooltipTriggerList = [].slice.call(
            document.querySelectorAll('[data-bs-toggle="tooltip"]'),
        );
        tooltips = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        copyBtn = $("#generated_link_box").children("button").eq(0);
    };
    init();
    $("#btnShorten").click(function () {
        $(".alert").remove();
        let url = $("input[name=url]").val();
        let obj = JSON.stringify({
            group_guid: "Bl74j35OB0C",
            domain: "bit.ly",
            long_url: url,
        });
        $.ajax({
            url: "https://api-ssl.bitly.com/v4/shorten",
            method: "POST",
            dataType: "json",
            headers: {
                Authorization: "Bearer 4f1a3a2c4e5a9d41232a5d81f504cfba85dd6bef",
            },
            contentType: "application/json",
            data: obj,
        })
            .done(function (response_data) {
                $("#generated_link_box").children("input").val(response_data.link);
                $("#url_long").children("a").text(url);
                $("#url_long").children("a").attr("href", url);
                $("#generated_url_section").removeClass("d-none");
                $("#url_long_section").removeClass("d-none");
            })
            .fail(function (jqXHR) {
                let errors = JSON.parse(jqXHR.responseText).errors;
                if (
                    errors.length > 0 &&
                    errors[0].hasOwnProperty("field") &&
                    errors[0].field == "long_url"
                ) {
                    createInvalidURLAlert();
                }
            });
    });
    let createInvalidURLAlert = () => {
        let alert = `
			<div class="alert alert-danger alert-dismissible fade show mb-0 py-2" id="alert-invalid-url" role="alert">
			    <p>Please enter a valid URL.</p> 
			    <button type="button" class="btn-close pt-2" data-bs-dismiss="alert" aria-label="Close"></button>
			</div>
			`;
        $(alert).prependTo("#section_form");
    };
    copyBtn.click(function () {
        var copyText = document.querySelector("#generated_link_box input");
        copyText.select();
        document.execCommand("copy");
        copyText.setSelectionRange(0, 0);
        copyTooltipText(1);
        tooltips[0].show();
    });
    copyBtn.mouseleave(function () {
        copyTooltipText(0);
    });
    let copyTooltipText = (option) => {
        let btn = $("#generated_link_box").children("button").eq(0);
        let new_text = option == 0 ? "Copy to clipboard" : "Copied!";
        btn.attr("data-bs-original-title", new_text);
    };
});
