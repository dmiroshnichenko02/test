window.addEventListener('DOMContentLoaded', (e) => {
    //range
    const storage = document.getElementById('storage');
    const transfer = document.getElementById('transfer');
    const storageLabel = document.querySelector('.storage__label')
    const transferLabel = document.querySelector('.transfer__label')
    // graph
    const backblaze = document.querySelector('.cost__graph_backblaze');
    const bunny = document.querySelector('.cost__graph_bunny');
    const scaleway = document.querySelector('.cost__graph_scaleway');
    const vultr = document.querySelector('.cost__graph_vultr');
    //cost
    const backblazeCost = document.querySelector('.cost__graph_backblaze span');
    const bunnyCost = document.querySelector('.cost__graph_bunny span');
    const scalewayCost = document.querySelector('.cost__graph_scaleway span');
    const vultrCost = document.querySelector('.cost__graph_vultr span');
    //checkbox
    const hdd = document.getElementById('hdd');
    const ssd = document.getElementById('ssd');
    const multy = document.getElementById('multy');
    const single = document.getElementById('single');

    function checker(first, second) {
        first.checked === true ? second.checked = false : null
        first.checked === false ? second.checked = true : null
        cost(side)
    };

    let side = false

    if(window.innerWidth < 767) {
        side = true;
    } else {
        side = false;
    }

    //calc
    function cost(side) {
        const storageVal = +storage.value;
        const transferVal = +transfer.value;
        const blazeCalc = ((storageVal * 0.005) + (transferVal * 0.01)) < 7 ? 7 : ((storageVal * 0.005) + (transferVal * 0.01)).toFixed(2);
        //backblaze
        side ? backblaze.style.height = `${blazeCalc * 3}%` : backblaze.style.width = `${blazeCalc * 3}%`;
        backblazeCost.textContent = blazeCalc <= 7 ? '7$' : `${blazeCalc}$`;
        //bunny
        const bunnyStorageCost = ssd.checked ? 0.02 : 0.01;
        const bunnyCalc = ((storageVal * bunnyStorageCost) + (transferVal * 0.01)) > 10 ? 10 : ((storageVal * bunnyStorageCost) + (transferVal * 0.01)).toFixed(2);
        side ? bunny.style.height = `${bunnyCalc * 3}%` : bunny.style.width = `${bunnyCalc * 3}%`;
        bunnyCost.textContent = bunnyCalc > 10 ? '10$' : `${bunnyCalc}$`;
        //scaleway
        const scalewayStorageCost = storageVal <= 75 ? 0 : multy.checked ? 0.06 : 0.03;
        const scalewayTransferCost = transferVal <= 75 ? 0 : 0.02;
        const scalewayCalc = (((storageVal - 75) * scalewayStorageCost) + ((transferVal - 75) * scalewayTransferCost)).toFixed(2);
        side ? scaleway.style.height = scalewayCalc * 3 > 100 ? '100%' : `${scalewayCalc * 3}%` : scaleway.style.width = scalewayCalc * 3 > 100 ? '100%' : `${scalewayCalc * 3}%`;
        scalewayCost.textContent = `${scalewayCalc}$`;
        //vultr
        const vultrCalc = ((storageVal * 0.01) + (transferVal * 0.01)) < 5 ? 5 : ((storageVal * 0.01) + (transferVal * 0.01)).toFixed(2);
        side ? vultr.style.height = `${vultrCalc * 3}%` : vultr.style.width = `${vultrCalc * 3}%`;
        vultrCost.textContent = `${vultrCalc}$`;
        //color
        const backblazeText = backblazeCost.textContent.slice(0, -1);
        const bunnyText = bunnyCost.textContent.slice(0, -1);
        const scalewayText = scalewayCost.textContent.slice(0, -1);
        const vultrText = vultrCost.textContent.slice(0, -1);
        const arr = [backblazeText, bunnyText, scalewayText, vultrText].sort((a, b) => a-b);
        switch(arr[0]) {
            case backblazeText :
                backblaze.style.backgroundColor = 'red';
                bunny.style.backgroundColor = 'rgb(152, 151, 151)';
                scaleway.style.backgroundColor = 'rgb(152, 151, 151)';
                vultr.style.backgroundColor = 'rgb(152, 151, 151)';
                break;
            case bunnyText:
                bunny.style.backgroundColor = 'orange';
                backblaze.style.backgroundColor = 'rgb(152, 151, 151)';
                scaleway.style.backgroundColor = 'rgb(152, 151, 151)';
                vultr.style.backgroundColor = 'rgb(152, 151, 151)';
                break;
            case scalewayText:
                scaleway.style.backgroundColor = 'purple';
                backblaze.style.backgroundColor = 'rgb(152, 151, 151)';
                bunny.style.backgroundColor = 'rgb(152, 151, 151)';
                vultr.style.backgroundColor = 'rgb(152, 151, 151)';
                break;
            case vultrText:
                vultr.style.backgroundColor = 'blue';
                backblaze.style.backgroundColor = 'rgb(152, 151, 151)';
                bunny.style.backgroundColor = 'rgb(152, 151, 151)';
                scaleway.style.backgroundColor = 'rgb(152, 151, 151)';
                break;
            default :
            throw new Error('error');
        };
    };

    // checkbox Check
    ssd.addEventListener('change', () => {
        checker(ssd, hdd)
    });
    hdd.addEventListener('change', () => {
        checker(hdd, ssd)
    });
    multy.addEventListener('change', () => {
        checker(multy, single)
    });
    single.addEventListener('change', () => {
        checker(single, multy)
    });

    //range

    function rangeMove(label, e, content) {
        let value = e.currentTarget.value;
        label.textContent = `${content}: ${value} GB`
        cost(side)
    };

    storage.addEventListener('mousemove', (e) => {
        rangeMove(storageLabel, e, 'Storage')
    });

    transfer.addEventListener('mousemove', (e) => {
        rangeMove(transferLabel, e, 'Transfer')
    });
    storage.addEventListener('touchmove', (e) => {
        rangeMove(storageLabel, e, 'Storage')
    });

    transfer.addEventListener('touchmove', (e) => {
        rangeMove(transferLabel, e, 'Transfer')
    });

});