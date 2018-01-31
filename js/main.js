jQuery(document).ready(function($)
{
        var cc = $("#cc"),
            cvv = $("#cvv"),
            name_on_cc = $("#name_on_cc"),
            cc_expire_year = $("#cc_expire_year"),
            cc_expire_month = $("#cc_expire_month"),
            ln_submit = $("#ln_submit"),
            formdata = $("#formdata"),
            allSpacesRe = /\s+/g;

        cc.bind('input', function() {
            var cardCode = this.value.replace(/[^\d]/g, '').substring(0,19);
            cardCode = cardCode != '' ? cardCode.match(/.{1,4}/g).join(' ') : '';
            this.value = cardCode;
        }).bind("blur", function () {
            var allSpacesRe = /\s+/g;
            var arr = [];
            var cn = this.value.replace(allSpacesRe, "");
            for(var i = 0; i < cn.length; i++) {
                if(i % 2 === 0) {
                    var m = parseInt(cn[i]) * 2;
                    if(m > 9) {
                        arr.push(m - 9);
                    } else {
                        arr.push(m);
                    }
                } else {
                    var n = parseInt(cn[i]);
                    arr.push(n)
                }
            }
            var summ = arr.length ? arr.reduce(function(a, b) { return a + b; }) : 0;
            if (cn.length < 13 || cn.length > 19) {
                $(this).closest("tr").addClass("error numbers_ln");
                $(this).attr("data-valid", "false");
                console.log();
            }
            if (cn.length >12 && Boolean(summ % 10)) {
                $(this).closest("tr").addClass("error numbers");
                $(this).attr("data-valid", "false");
            }

        }).bind("focus", function () {
            $(this).closest("tr").removeClass("error numbers_ln numbers");
            $(this).attr("data-valid", "true");
        });

        cvv.on('input', function() {
            var cardCode = this.value.replace(/[^\d]/g, '').substring(0,4);
            this.value = cardCode;
        });


        name_on_cc.bind("blur", function () {
            var re = /\D+/;
            var reAplpa = /[^А-Яа-яЁёa-zA-Z0-9 '\-\.\/\\)(&]/;

            if (this.value.replace(allSpacesRe, "").length < 3 || !this.value.match(re)) {
                $(this).closest("tr").addClass("error length");
                $(this).attr("data-valid", "false");
            }
            if (this.value.match(reAplpa)) {
                $(this).closest("tr").addClass("error symbol");
                $(this).attr("data-valid", "false");
            }
        }).bind("focus", function () {
            $(this).closest("tr").removeClass("error length symbol");
            $(this).attr("data-valid", "true");
        });

       cc_expire_year.add(cc_expire_month).bind("blur", function () {
            var date = new Date(),
                month = date.getMonth()+1,
                year = date.getFullYear(),
                expectedYear = '20' + cc_expire_year.val(),
                expectedMonth = cc_expire_month.val();

            if (expectedYear < year || (expectedYear == year && expectedMonth < month) ){
                $(this).closest("tr").addClass("error");
                cc_expire_year.add(cc_expire_month).attr("data-valid", "false");
            }
        }).bind("focus", function () {
           $(this).closest("tr").removeClass("error");
           cc_expire_year.add(cc_expire_month).attr("data-valid", "true");
        });

         cvv.bind("blur", function () {

            if (this.value.replace(allSpacesRe, "").length < 3 ||
                this.value.replace(allSpacesRe, "").length > 4){
                $(this).closest("tr").addClass("error");
                $(this).attr("data-valid", "false");
            }
        }).bind("focus", function () {
             $(this).closest("tr").removeClass("error");
             $(this).attr("data-valid", "true");
        });

        $(".flag").bind('click', function () {
            var lang = "data-lang-"+$(this).attr("data-lang");
            $("["+ lang +"]").each(function () {
                if ($(this).is('input') && $(this).attr('type') === 'submit') {
                    $(this).val($(this).attr(lang));
                } else if ($(this).is('input') && $(this).attr('type') === 'text') {
                    $(this).attr('placeholder', $(this).attr(lang));
                } else {
                    $(this).html($(this).attr(lang));
                }
            });
        });

        function validate(){
            var validate = true;
            formdata.find('input, select').each(function () {
                if ($(this).attr('data-valid') === 'false') {
                    validate = false;
                }
            });
            return validate;
        }

        formdata.submit(function () {
            formdata.find('input, select').trigger('blur');
            if (!validate()) {
                return false;
            }
            cc.val(cc.val().replace(/\s/g, ''));
            ln_submit.disabled = true;
            ln_submit.addClass("ln_submit_color");
        });
});




