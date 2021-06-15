{% extends "layout.swig" %}

{% block body %}
<style>
.custom-select {
    height: 57px;
    border: none;
    border-radius: 1px;
}
</style>

<section class="banner-login">
    <div class="container">
        <div class="row">

		<main class="main main-signup col-lg-5">
		<h3>Elections</h3>
			<table class="table table-striped">
				<thead>
					<td><strong>Election</strong></td>
					<th><strong>Candidates</strong></th>
					<td><strong>Result</strong></td>
				</thead>
				<tbody>
					{% for election in elections %}
						<tr>
							<td><a href='/cast-vote/{{ election.id }}'>{{ election.election }}</a></td>
							<td>{{ election.candidates.length }}</td>
							<td><a href='/admin/result/{{ election.id }}'>[ view result ]</a></td>
						</tr>
					{% endfor %}				
				</tbody>
			</table>		
		</main>

		<main class="col-lg-1"></main>
	   
	    <main class="main main-signup col-lg-6">
	     <div class="text-center">
				
		  <div class="form-sign">
		   <form action="/create-election" id="election" method="post">
		    <div class="formhead">
			 <h3>Create Election - Generate Keys</h3>
			</div><!-- /.form-head -->
            <div class="form-body">            	
            	
			<div class="alert alert-success hidden"></div>
             <div class="form-row">
			  <div class="form-controls">
			   <input type="text" name="election" class="field" value="" placeholder="Title of election" required>
			  </div><!-- /.form-controls -->
             </div><!-- /.form-row -->		

			 </div><!-- /.form-body -->
	
			 <div>
			  <div class="form-actions">
			   <input type="submit" value="Create Election" class="kafe-btn kafe-btn-mint full-width">
			  </div><!-- /.form-actions -->
			 </div><!-- /.form-foot -->
		   </form>
		   
		  </div><!-- /.form-sign -->
	     </div><!-- /.col-lg-6 -->
        </main>
		
	   </div><!-- /.row -->
    </div>
</section>
{% endblock %}

{% block scriptTag %}
<script>
$(document).ready(function() {
    $("#election").submit(function(e) {
        e.preventDefault();

        $.post('/create-election', $(this).serialize(), function(d) {
            if (d.status === true) {
                $(".alert-success").text("Election keys generation").removeClass("hidden");
            }
        }, 'json');
    });
});
</script>
