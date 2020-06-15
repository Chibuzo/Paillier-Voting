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
		   <form action="/user" method="post">
		    <div class="formhead">
			 <h3>Register</h3>
			</div><!-- /.form-head -->
            <div class="form-body">            	
            	
			
             <div class="form-row">
			  <div class="form-controls">
			   <input type="text" name="name" class="field" value="" placeholder="Full Name">
			  </div><!-- /.form-controls -->
             </div><!-- /.form-row -->		
             
             <div class="form-row">
			  <div class="form-controls">
			   <input type="text" name="email" class="field" value="" placeholder="Email">
			  </div><!-- /.form-controls -->
             </div><!-- /.form-row -->
             
             <div class="form-row">
			  <div class="form-controls">
			   <input type="text" name="phone" class="field" value="" placeholder="Phone">
			  </div><!-- /.form-controls -->
             </div><!-- /.form-row -->

		     <div class="form-row row">
                <div class="col-md-6">
                    <div class="form-controls">
                    <select name="state" class="form-control custom-select" required>
                            <option value="">State of Origin</option>
                            <option value="Abia">Abia</option>
                            <option value="Abuja">Abuja</option>
                            <option value="Adamawa">Adamawa</option>
                            <option value="Akwa Ibom">Akwa Ibom</option>
                            <option value="Anambra">Anambra</option>
                            <option value="Bauchi">Bauchi</option>
                            <option value="Bayelsa">Bayelsa</option>
                            <option value="Benue">Benue</option>
                            <option value="Borno">Borno</option>
                            <option value="Cross River">Cross River</option>
                            <option value="Delta">Delta</option>
                            <option value="Ebonyi">Ebonyi</option>
                            <option value="Edo">Edo</option>
                            <option value="Ekiti">Ekiti</option>
                            <option value="Enugu">Enugu</option>
                            <option value="Gombe">Gombe</option>
                            <option value="Imo">Imo</option>
                            <option value="Jigawa">Jigawa</option>
                            <option value="Kaduna">Kaduna</option>
                            <option value="Kano">Kano</option>
                            <option value="Katsina">Katsina</option>
                            <option value="Kebbi">Kebbi</option>
                            <option value="Kogi">Kogi</option>
                            <option value="Kwara">Kwara</option>
                            <option value="Lagos">Lagos</option>
                            <option value="Nasarawa">Nasarawa</option>
                            <option value="Niger">Niger</option>
                            <option value="Ogun">Ogun</option>
                            <option value="Ondo">Ondo</option>
                            <option value="Osun">Osun</option>
                            <option value="Oyo">Oyo</option>
                            <option value="Plateau">Plateau</option>
                            <option value="Rivers">Rivers</option>
                            <option value="Sokoto">Sokoto</option>
                            <option value="Taraba">Taraba</option>
                            <option value="Yobe">Yobe</option>
                            <option value="Zamfara">Zamfara</option>
                        </select>
                    </div><!-- /.form-controls -->
                </div>    
                <div class="col-md-6">
                    <div class="form-controls">
                    <select name="gender" class="form-control custom-select">
                        <option value="">Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>    
                    </div><!-- /.form-controls -->
                </div>    
		     </div><!-- /.form-row -->
		   
			 </div><!-- /.form-body -->
	
			 <div>
			  <div class="form-actions">
			   <input type="submit" name="register" value="Register" class="kafe-btn kafe-btn-mint full-width">
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
