{% extends '../layout.swig' %}

{% block body %}
<div class="row">
    <div class="col-md-5">
        <h3>All Votes (Encrypted)</h3>
        <div class="panel">
            <div class="panel-body" style="word-wrap: break-word">{{ rawResult }}</div>
        </div>    
        <br />
        <button class="kafe-btn kafe-btn-mint-small btn-lg" id="load-result">Load SecretKey & decrypt</button>
    </div>

    <div class="col-md-7">
        <h3 style="margin-left: 17px">Total Votes: {{ totalVotes }}</h3>
        {% for candidate in candidates %}
            <div class="col-lg-6">	            
                <div class="text-center card-box">
                    <div class="clearfix"></div>
                    <div class="member-card">
                        <div class="thumb-xl member-thumb m-b-10 center-block">
                            <img src="/images/silo.png" class="img-circle img-thumbnail" alt="profile-image">
                            <i class="mdi mdi-star-circle member-star text-success" title="verified user"></i>
                        </div>

                        <div class="">
                            <h4 class="m-b-5">{{ candidate.candidate.fullname }}</h4>
                            <p class="text-danger"><i class="fa fa-thumbs-o-up"></i>Votes: <span class="pending">Pending</span> <span style="color: #333" class="result hidden"><strong>{{ candidate.votes }}</strong></span></p> 
                            <p> <span><span class="text-muted">Running to Be: </span><span class="text-mint">{{ candidate.candidate.position }}</span> </span></p>
                        </div>
                    </div>
                </div>
            </div>
        {% endfor %}    
    </div>
</div>
{% endblock %}
{% block scriptTag %}
<script>
$(document).ready(function() {
    $("#load-result").click(function() {
        const $this = $(this);
        $this.html("<i class='fa fa-cogs fa-spin'></i> <i>Decrypting...</i>");
        setTimeout(function() {
            $(".pending").hide();
            $(".result").removeClass("hidden");
            $this.text("Load SecretKey & decrypt");
        }, 7000);
    });
});
</script>
{% endblock %}