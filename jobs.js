jQuery(document).ready(function() {
	jQuery('body').addClass('jobs');

	jQuery.ajax({
 		/*url: 'http://www.oregontechcompanies.org/jobs/',*/
		url: '/jobsjson.php',
		type: 'GET',
		data: {
			// locations: {0: {state: "oregon"}}
			// locations: {0: {state: "oregon", city: "eugene"}}
		},
		success: function (response) {
			data = _(response).map(function(cell){
				return {
					"name": cell.name + '',
					"link": (cell.link && cell.link.indexOf("http") < 0 ? "http://" + cell.link : cell.link) + '',
					"openings": cell.openjobcount * 1
				};
			});
			initDataDOM(data);
	
			jQuery('#chkHiring').on('click',toggleHiring);
		}
	});
});

var jobs;

function toggleHiring() {
	jQuery("#jobsList").empty();
	updateDOM();
}

function initDataDOM(data) {
    // alpha sort by name
    jobs = _(data).sortBy(function(company){
        return company.name.toUpperCase();
    });
	updateDOM();
}

function updateDOM() {
	var hiringOnly = jQuery("#chkHiring").prop("checked");
    var showCompanies = _(jobs).filter(function(entry){
        return (! hiringOnly || entry.openings);
    });
    var numCompanies = showCompanies.size();
    var numJobs = showCompanies.sumBy('openings');

    var jobsHtml = showCompanies.chunk(4).reduce(function(carry, jobsGroup){
        return carry + makeRow(jobsGroup);
    }, '');

    jQuery("#numJobs").text(numJobs);
    jQuery("#numCompanies").text(numCompanies);
    jQuery("#jobsList").append(jobsHtml);
}

function makeRow(companyGroup){
    return '<div class="row">'+_(companyGroup).reduce(function(result, company){
        return result + makeItem(company);
    },'')+'</div>';
}

function makeItem(company) {
    item = '<article class="company-item col-sm-6 col-md-3"><div>';
	item += '<span class="glyphicon glyphicon-hand-right bullet" aria-hidden="true"></span>';
	item += '<span class="company-name">';
    item += (company.link ? '<a href="'+company.link+'" target="link">'+company.name+'&nbsp;<span class="glyphicon glyphicon-link"></span></a>' : company.name);
	item += '</span>';
	item += '<span class="company-job-openings">' + (company.openings ? '<span class="label label-primary">'+company.openings+'</span>' : '<span class="no-openings">&#8211;</span>')+'</span>';
	item += '</div></article>';
	return item;
}
