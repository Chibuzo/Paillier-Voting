{% extends "layout.swig" %}

{% block body %}
<section class="banner-login">
    <div class="container">
        <div class="row">
	   
	    <main class="main main-signup col-lg-12">
	     <div class="col-lg-6 col-lg-offset-3 text-center">
				
		  <div class="form-sign">
		   <form action="/login" method="post">
		    <div class="formhead">
			 <h3>Authentication</h3>
			</div><!-- /.form-head -->
            <div class="form-body">            	
             
             <div class="form-row">
			  <div class="form-controls">
			   <input type="text" name="email" class="field" placeholder="Email">
			  </div><!-- /.form-controls -->
             </div><!-- /.form-row -->
		   
			 </div><!-- /.form-body -->
	
			 <div>
			  <div class="form-actions">
			   <input type="submit" name="register" value="Continue" class="kafe-btn kafe-btn-mint full-width">
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
