console.log('\x1b[36m%s\x1b[0m', 'I am cyan'); // Cyan
console.log('\x1b[33m%s\x1b[0m', 'yellow'); // Yellow

const mods = 
    ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"].reduce(function (
        obj,
        color,
        index
    ) {
        // foreground
        obj[color] = { _fg: [30 + index, 39] };
        obj[color + "Bright"] = { _fg: [90 + index, 39] };

        // background
        obj["bg" + color[0].toUpperCase() + color.slice(1)] = { _bg: [40 + index, 49] };
        obj["bg" + color[0].toUpperCase() + color.slice(1) + "Bright"] = { _bg: [100 + index, 49] };

        return obj;
    }, {})


console.log(mods)