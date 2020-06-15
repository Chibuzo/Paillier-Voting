{% extends "layout.swig" %}

{% block body %}
<div class="section-title" style="padding-top: 20px;">
    <h1>Organization :- Harvard Campus Election</h1>
</div>
	   
    <!-- START OF INTERNAL ROW --><div class="row">

<div class="col-lg-4">	
<span id="comment458484136448"></span>
            
    <div class="text-center card-box">
    <div class="clearfix"></div>
    <div class="member-card">
    <div class="thumb-xl member-thumb m-b-10 center-block">
    <img src="https://www.themashabrand.com/scripts/Voting/source/nominee/uploads/151725506803065.jpg" class="img-circle img-thumbnail" alt="profile-image">
    <i class="mdi mdi-star-circle member-star text-success" title="verified user"></i>
    </div>

    <div class="">
    <h4 class="m-b-5">Nominee Ten</h4>
    <p class="text-danger"><i class="fa fa-thumbs-o-up"></i> 6 Votes</p> 
    <p class="text-mint"><span class="text-mint"> Harvard Campus Election</span></p>  
    <p> <span><span class="text-muted">Running to Be: </span><span class="text-mint">President</span> </span></p>
    </div>

    
    <a href="#" class="kafe-btn kafe-btn-danger-small vote"  data-candidate="c2"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> vote</a>
    </div>
    </div>
</div><!-- /.col-lg-4 -->
{% endblock %}

{% block scriptTag %}
<script>
$(document).ready(function() {
    const election = 'Presidencial';

    $(".vote").click(function() {
        const candidate = $(this).attr("id");

        $.post('/vote', { candidate, election }, function(d) {
            if (d.status.trim() === 'success') {
                alert('Voted!');
            }
        });
    });
});
</script>