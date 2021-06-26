var data
dataset = "940";




function fillDemo(dataset) {
    idMeta = data.metadata.filter(i => i.id === parseInt(dataset));
    var demoList = d3.select('#demoList');
    demoList.text('');
    Object.entries(idMeta[0]).forEach(i => {
        demoList.append('li').text(i[0] + ': ' + i[1]);
    });
};

function hbar(dataset) {
    idSamples = data.samples.filter(i => i.id === dataset)[0];
    var zipSamples = [];
    for (let i = 0; i < 10; i++) {
        zipSamples.push([idSamples.otu_ids[i],idSamples.sample_values[i],idSamples.otu_labels[i]])  
    }
    zipSamples.sort((a,b)=> a[1] - b[1] );
    console.log(zipSamples);
    trace = {
        y:zipSamples.map(i => 'OTU '+i[0]),
        x:zipSamples.map(i => i[1]),
        hovertext:zipSamples.map(i => i[2]),
        type: 'bar',
        orientation: 'h'
    }
    Plotly.newPlot('bar',[trace])
};

function bubble(dataset) {
    idSamples = data.samples.filter(i => i.id === dataset)[0];
    trace = {
        type: "scatter",
        mode: "markers",
        x: idSamples.otu_ids,
        y: idSamples.sample_values,
        hovertext:idSamples.otu_labels,
        marker: {
            color: idSamples.otu_ids,
          size: idSamples.sample_values,
          sizemode: 'area'
        }
    }
    Plotly.newPlot('bubble',[trace]);
};

function init() {

    d3.json("data/samples.json").then((importedData) => {
        data = importedData[0];
        var dropdownMenu = d3.select("#selDataset");
        data.names.forEach(i => {
            dropdownMenu.append('option').text(i);
        });
        fillDemo(data.names[0]);
        hbar(data.samples[0].id);
        bubble(data.samples[0].id);
    });
};

function optionChanged() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    fillDemo(dataset);
    hbar(dataset);
    bubble(dataset);
    console.log(dataset);
};

init();