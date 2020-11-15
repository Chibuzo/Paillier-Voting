<!DOCTYPE html>
<html>
  <head>
    <title>E-voting</title>

    <!-- Viewport mobile tag for sensible mobile support -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">


    <!--STYLES-->
    <link rel="stylesheet" href="/css/style.css">
    <!--STYLES END-->
  </head>

  <body>
    <header class="tr-header">
      <nav class="navbar navbar-default">
       <div class="container">
	    <div class="navbar-header">
		 <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
		  <span class="sr-only">Toggle navigation</span>
		  <span class="icon-bar"></span>
		  <span class="icon-bar"></span>
		  <span class="icon-bar"></span>
		 </button>
		 <a class="navbar-brand" href="https://www.themashabrand.com/scripts/Voting/">Voting</a>
		</div><!-- /.navbar-header -->
		<div class="navbar-left">
		 <div class="collapse navbar-collapse" id="navbar-collapse">
		  <ul class="nav navbar-nav">
		   <li class="active"><a href="/cast-vote">Vote</a></li>
		   <li class=""><a href="admin/result">Results</a></li>
		  </ul>
		 </div>
		</div><!-- /.navbar-left -->
		<div class="navbar-right"> 
		 	
		 	
		 <ul class="nav navbar-nav">
		 	
		  <li><i class="fa fa-user"></i></li>
		  <li class=""><a href="/login">Login</a></li>
		 </ul><!-- /.sign-in -->   
		 <a href="/register" class="kafe-btn kafe-btn-mint-small">
		 	Register		 	as		 	a		 	Voter		 </a>
		  		 		
		</div><!-- /.nav-right -->
       </div><!-- /.container -->
      </nav><!-- /.navbar -->
     </header><!-- Page Header -->

    <div class="featured-users">
	    <div class="container">
	        <div class="row">
                {% block body %}

                {% endblock %}
            </div>
        </div>
    </div>        

   <!-- ==============================================
	 Footer Section
	 =============================================== -->
	 <footer class="footerWhite">

      <!-- COPY RIGHT -->
      <div class="clearfix copyRight">
       <div class="container">
        <div class="row">
         
		 <div class="col-xs-12">
          <div class="copyRightWrapper">
           <div class="row">
		   
            <div class="col-sm-5 col-sm-push-7 col-xs-12">
			 <ul class="list-inline socialLink">
			  <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
			  <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
			  <li><a href="#"><i class="fa fa-pinterest-p" aria-hidden="true"></i></a></li>
			  <li><a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
			 </ul>
            </div><!-- /col-sm-5 -->
			
		    <div class="col-sm-7 col-sm-pull-5 col-xs-12">
			 <div class="copyRightText">
			  <p>Copyright © Voting&nbsp; 2019. All Rights Reserved</p>
			 </div>
		    </div><!-- /col-sm-7 -->
		  
           </div><!-- /row -->
          </div><!-- /copyRightWrapper -->
         </div><!-- /col-xs-2 -->

        </div><!-- /row -->
       </div><!-- /container -->
      </div><!-- /copyRight -->
	  
    </footer>	
    
    
    <!--SCRIPTS-->
    <script src="/js/jquery-3.2.1.min.js"></script>
	<script src="/js/bootstrap.min.js"></script>
    <!--SCRIPTS END-->

    {% block scriptTag %}
    {% endblock %}
  </body>
</html>
