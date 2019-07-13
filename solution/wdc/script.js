console.log("Hello!!");

(function() {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function(schemaCallback) {
    var cols = [
      {
        id: "Area",
        alias: "Area",
        dataType: tableau.dataTypeEnum.string
      },
      {
        id: "Item",
        alias: "Item",
        dataType: tableau.dataTypeEnum.string
      },
      {
        id: "Year",
        dataType: tableau.dataTypeEnum.int
      },
      {
        id: "Unit",
        dataType: tableau.dataTypeEnum.float
      }
    ];

    var tableSchema = {
      id: "foodWDCC",
      alias: "Connecting to Food API built by Andre",
      columns: cols
    };

    schemaCallback([tableSchema]);
  };

  myConnector.getData = function(table, doneCallback) {
    $.getJSON("https://wdc-api.andre347.now.sh/api", function(resp) {
      var feat = resp.data,
        tableData = [];

      // Iterate over the JSON object
      for (var i = 0, len = feat.length; i < len; i++) {
        tableData.push({
          Area: feat[i].Area,
          Item: feat[i].Item,
          Year: feat[i].Year,
          Unit: feat[i].Unit
        });
      }

      table.appendRows(tableData);
      doneCallback();
    });
  };

  tableau.registerConnector(myConnector);

  $(document).ready(function() {
    $("#getData").click(function() {
      console.log("Hello, clicked on the button!");
      tableau.connectionName = "Food WDC API";
      tableau.submit();
    });
  });
})();
