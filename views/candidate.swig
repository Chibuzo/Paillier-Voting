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
	   
	    <main class="main main-signup col-lg-12">
	     <div class="col-lg-6 col-lg-offset-3 text-center">
				
		  <div class="form-sign">
		   <form action="/candidate" method="post">
		    <div class="formhead">
			 <h3>Add Candidate to Election</h3>
			</div><!-- /.form-head -->
            <div class="form-body">            	
            	
			
             <div class="form-row">
			  <div class="form-controls">
			   <input type="text" name="fullname" class="field" value="" placeholder="Full Name" required>
			  </div><!-- /.form-controls -->
             </div><!-- /.form-row -->		

		     <div class="form-row row">
                <div class="col-md-12">
                    <div class="form-controls">
                    <select name="election" class="form-control custom-select" required>
                        <option value="">Election</option>
                        {% for election in sails.config.elections %}
                            <option value="{{ election.id }}">{{ election.election }}</option>
                        {% endfor %}    
                        </select>
                    </div><!-- /.form-controls -->
                </div>    
		     </div><!-- /.form-row -->
		   
			 </div><!-- /.form-body -->
	
			 <div>
			  <div class="form-actions">
			   <input type="submit" value="Add Candidate" class="kafe-btn kafe-btn-mint full-width">
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
