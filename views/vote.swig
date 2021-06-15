{% extends "layout.swig" %}

{% block body %}
<div class="section-title" style="padding-top: 20px;">
    <h1>{{ election.election }}</h1>
</div>
<div class="text-center"><h3>Total Votes: <span id="vote-count">{{ vote_count }}</span></h3></div><br>
	   
    <!-- START OF INTERNAL ROW --><div class="row">
{% for candidate in election.candidates %}
    <div class="col-lg-3">	            
        <div class="text-center card-box">
            <div class="clearfix"></div>
            <div class="member-card">
                <div class="thumb-xl member-thumb m-b-10 center-block">
                    <img src="/images/silo.png" class="img-circle img-thumbnail" alt="profile-image">
                    <i class="mdi mdi-star-circle member-star text-success" title="verified user"></i>
                </div>

                <div class="">
                    <h4 class="m-b-5">{{ candidate.fullname }}</h4>
                    <p class="text-danger"><i class="fa fa-thumbs-o-up"></i>Votes: Pending</p> 
                    <p> <span><span class="text-muted">Running to Be: </span><span class="text-mint">{{ election.election }}</span> </span></p>
                </div>

            
                <a href="" class="kafe-btn kafe-btn-danger-small vote" data-candidate="{{ candidate.id }}" data-election="{{ election.id }}"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> vote</a>
            </div>
        </div>
    </div>
{% endfor %}    
</div>

<div class="row">
    <div class="col-xs-6  col-xs-offset-3 text-center"><div id="timer"></div><br></div>
</div>    
<div class="row">
    <div class="col-xs-6 col-xs-offset-3 text-center"><div class="panel"><div class="panel-body" style="word-wrap: break-word"></div></div></div>
</div>
{% endblock %}

{% block scriptTag %}
<script>
$(document).ready(function() {
    let vote_count = +$('#vote-count').text();

    $(".vote").click(function(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to vote for this candidate?")) {
            const candidate = $(this).data("candidate");
            const election = $(this).data("election");

            $.post('/cast-vote', { candidate, election }, function(d) {
                console.log(d)
                if (d.status.trim() === 'success') {
                    if (d.cipherText) {
                        vote_count += 1;
                        $('#vote-count').text(vote_count);
                        $(".panel-body").text(d.cipherText);
                        $("#timer").text(`Voting took: ${d.duration} seconds`);
                    }
                }
            }, 'JSON');
        }
    });
});
</script>
{% endblock %}