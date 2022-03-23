var allData = [];

function Select() {
  if ($("section.content").length > 0) {
    $('.select').select2({
      minimumResultsForSearch: -1,
      placeholder: "Filter by Region",
    });
  }
}

function HomeApi() {
  if ($("section.content").length > 0) {
    $(".loadingBox").show();
    axios({
      method: "get",
      url: "https://restcountries.com/v2/all",
    }).then(function (response) {
      let regionList = [];
      allData = response.data;
      allData.forEach((element, index) => {
        let countriesList = $("ul.countries");
        let countriesData =
          '<li>' +
          '<a  href="javascript:;" class="box" country-index="' + index + '">' +
          '<div class="imageBox">' +
          '<img src="' + element.flags.png + '" alt="' + element.name + '" />' +
          '</div>' +
          '<div class="textBox">' +
          '<div class="title">' +
          '<h2>' + element.name + '</h2>' +
          '</div>' +
          '<span><strong>Population:</strong>' + String(element.population).replace(/(.)(?=(\d{3})+$)/g, '$1,') + '</span>' +
          '<span region-text><strong>Region:</strong>' + element.region + '</span>' +
          '<span><strong>Capital:</strong>' + (element.capital !== undefined ? element.capital : '') + '</span>' +
          '</div>' +
          '</a>' +
          '</li>';

        countriesList.append(countriesData);

        if (regionList.sort().indexOf(element.region) < 0) {
          regionList.push(element.region);
        }
      });

      regionList.forEach(element => {
        $("#select").append('<option value="' + element + '">' + element + '</option>')
      });

      $(".loadingBox").hide();
      SendPage();
    })

  }
}

function DetailApi() {
  if ($("section.contentDetail").length > 0) {
    $(".loadingBox").show();
    var response = JSON.parse(localStorage.defCount);
    $(".contentDetail .bottom .left").append(
      '<div class="imageBox">' +
      '<img src="' + response.flags.png + '" alt="Belgie">' +
      '</div>'
    );

    $(".contentDetail .bottom .right").append(
      '<div class="titleBox">' +
      '<h2>' + response.name + '</h2> ' +
      '</div>' +
      '<div class="infoBox">' +
      '<ul>' +
      '<li><strong>Native Name: </strong>' + response.nativeName + '</li>' +
      '<li><strong>Population: </strong>' + String(response.population).replace(/(.)(?=(\d{3})+$)/g, '$1,') + '</li>' +
      '<li><strong>Region: </strong>' + response.region + '</li>' +
      '<li><strong>Sub Region: </strong>' + response.subregion + '</li>' +
      '<li><strong>Capital: </strong>' + (response.capital !== undefined ? response.capital : '') + '</li>' +
      '</ul>' +
      '<ul>' +
      '<li><strong>Top Level Domain: </strong>' + (response.topLevelDomain !== undefined ? response.capital : '') + '</li>' +
      '<li><strong>Currencies: </strong>' + (response.currencies !== undefined ? response.currencies[0].name : '') + '</li>' +
      '<li><strong>Languages: </strong>' + (response.languages !== undefined ? response.languages[0].name : '') + '</li>' +
      '</ul>' +
      '</div>' +
      '<div class="tagBox">' +
      '<strong>Border Counteries:</strong>' +
      '<div class="tags">' +
      '</div>' +
      '</div>'
    );

    if (response.borders !== undefined){
      if (response.borders.length > 0) {
        for (let index = 0; index < response.borders.length; index++) {
          $(".contentDetail .bottom .right .tagBox .tags").append('<a href="javascript:;"><span>' + response.borders[index] + '</span></a>')
        }
      }
    }

    $(".loadingBox").hide();

  }
}

function Delay(callback, ms) {
  let timer = 0;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, ms || 0);
  };
}

function SearchFilter() {
  if ($("section.content").length > 0) {
    $('#search').keyup(Delay(function (e) {
        var value = $(this).val().toLowerCase();
        $("ul.countries li").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      },
      500));
  }
}

function SelectFilter() {
  if ($("section.content").length > 0) {
    $('#select').on('select2:select', function (e) {
      var data = e.params.data;
      $("ul.countries li").filter(function () {
        if (data.text == "All")
          $(this).toggle(true)
        else
          $(this).toggle($(this).find("[region-text]").text().indexOf(data.text) > -1)
      });
    });
  }
}

function SendPage() {
  $(".box").click(function () {
    localStorage.defCount = JSON.stringify(allData[$(this).attr("country-index")]);
    window.location = 'content-detail.html';
  });
}

$(document).ready(function () {
  Select();
  HomeApi();
  DetailApi();
  SearchFilter();
  SelectFilter();
});