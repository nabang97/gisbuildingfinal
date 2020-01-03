<?php session_start(); ?>
<!doctype html>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>srtdash - ICO Dashboard</title>
    
    <?php include('inc/head.php') ?>
    
    <script type="text/javascript" src="script.js"></script>
    <script type="text/javascript" src="script_rumah.js"></script>
    <script type="text/javascript" src="script_umkm.js"></script>
    <script type="text/javascript" src="script_ibadah.js"></script>
    <script type="text/javascript" src="script_office.js"></script>
    <script type="text/javascript" src="script_pendidikan.js"></script>
    <script type="text/javascript" src="script_kesehatan.js"></script>
    <link rel="stylesheet" type="text/css" href="assets/css/dataTables.bootstrap4.min.css">
    <script type="text/javascript">
        tunggu=true;
    </script>
</head>
<body>
    <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
    <!-- preloader area start -->

    <div id="preloader">
          <div class="wrapper">
            <div class="circle circle-1"></div>
            <div class="circle circle-1a"></div>
            <div class="circle circle-2"></div>
            <div class="circle circle-3"></div>
          </div>
          <h1 style="font-size: 200%">Loading&hellip;</h1>
    </div>


    <!-- preloader area end -->
    <!-- page container area start -->
    <div class="page-container">
        <!-- sidebar menu area start -->
        <div class="sidebar-menu">
            <div class="sidebar-header">
                <div class="logo">
                    <a href="javascript:void(0)"><img src="inc/m.png" width="50px" /><h6 style="color: white;">GIS KOTO GADANG</h6></a>
                </div>
            </div>
            <?php include ('inc/sidebar-cari.php') ?>
        </div>
        <!-- sidebar menu area end -->
        <!-- main content area start -->
        <div class="main-content">
            <!-- header area start -->
            <div style="position: fixed; z-index: 1; width: 100%">
                <div class="header-area" id="tampilan-header">
                    <div class="row align-items-center">
                        <!-- nav and search button -->
                        <div class="col-md-4 col-sm-8 clearfix">
                            <div class="nav-btn pull-left">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div name="akses-admin" style="font-size: 120%; padding-left: 10%; padding-top: 2%"><label>Welcome <?php echo $_SESSION['username']; ?> !</label>
                            </div>
                        </div>
                        <!-- profile info & task notification -->
                        <div class="col-md-8 col-sm-4 clearfix">
                            <ul class="notification-area pull-right" style="padding-right: 32%">
                                <li><button class="btn btn-outline btn-primary" onclick="back()"><i class="ti-arrow-left"></i> Back</button></li>
                                <li name="akses-admin"><button class="btn btn-outline btn-primary" onclick="keloladata()"><i class="ti-settings"></i> Manage Data</button></li>
                                <li name="akses-admin" class="user-name dropdown-toggle" data-toggle="dropdown">
                                    <i class="ti-settings"></i>
                                    <div class="dropdown-menu">
                                        <div class="icon-container" onclick="pengaturan()" style="font-size: 90%"><span class="icon-name">&emsp;<i class="fas fa-wrench"></i> Account Setting</span></div>
                                        <div class="icon-container" onclick="logout()" style="font-size: 90%"><span class="icon-name">&emsp;<i class="fas fa-sign-out-alt"></i> Log Out</span></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            <div id="belakang" style="z-index: 0; visibility: hidden;"></div>

            <!-- header area end -->
            <!-- page title area start -->

            <!-- page title area end -->
            <div class="main-content-inner">
                <br/><br/><br/><br/><br/>
                    <div class="card"><div class="card-body"><div class="media mb-5"><div class="media-body">
                        <div class="panel-body" style="padding-top: 2%; padding-left: 2%; padding-right: 2%">
                        <h4 style="text-align: center;"><i class="fab fa-searchengin"></i> Search History</h4>
                       
                            <table width="100%" class="table table-striped table-bordered table-hover" id="listpencarian">
                                <thead>
                                    <tr style="text-align: center">
                                        <th>Access Time</th>
                                        <th>NIK</th>
                                        <th>Name Of Apllicant</th>
                                        <th>Necessary</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                        $sql=pg_query("SELECT * FROM search_history ORDER BY access_time ASC");
                                        $a=1;
                                        while ($data=pg_fetch_assoc($sql)) {
                                            $nik=$data['national_identity_number_of_applicant'];
                                            $no=$data['serial_number'];
                                            echo "<tr>";
                                            echo "<td>".$data['access_time']."</td>";
                                            echo "<td>".$nik."</td>";
                                            echo "<td>".$data['name_of_applicant']."</td>";
                                            echo "<td>".$data['search_type']."</td>";
                                            echo '<td>
                                                <a href="hasil-pencarian.php?nik='.$nik.'&no='.$no.'" class="btn btn-info btn-xs" style="color: white"><i class="fa fa-info-circle"></i> View Deatils</a>
                                                <button class="btn btn-danger btn-xs" data-toggle="modal" data-target="#delete-cari'.$a.'"><i class="fa fa-trash"></i> Delete</button>
                                                </td>';
                                            echo "</tr>";

                                            $j_datuk=pg_num_rows(pg_query("SELECT datuk_id FROM datuk WHERE tribe_id='$id'"));

                                            echo '
                                                <div class="modal fade" id="delete-cari'.$a.'">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title">Delete ?</h5>
                                                                <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                                                            </div>
                                                            <div class="modal-body"><center>
                                                                <p>Are you sure to delete this data from search history ? <br/>
                                                                </center>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                                <a class="btn btn-danger" style="color: white" href="act/hapus_cari.php?nik='.$nik.'&no='.$no.'">Delete</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ';
                                            $a++;
                                        }
                                    ?>
                                </tbody>
                            </table>
                        
                    </div>
                    </div></div></div></div>
               
                <!-- SAMPAI DISINI -->
                
            </div>
        </div>

        <!-- main content area end -->
        <!-- footer area start-->
        <footer>
            <div class="footer-area">
                <p>© Ridho Darman | Jurusan Sistem Informasi Universitas Andalas - Copyright 2018. All right reserved. Template by Colorlib. </p>
            </div>
        </footer>
        <!-- footer area end-->
    </div>
    <!-- page container area end -->
    <!-- offset area start -->

    <!-- offset area end -->



    <!-- jquery latest version -->
    <script src="assets/js/vendor/jquery-2.2.4.min.js"></script>
    <!-- bootstrap 4 js -->
    <script src="assets/js/popper.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/owl.carousel.min.js"></script>
    <script src="assets/js/metisMenu.min.js"></script>
    <script src="assets/js/jquery.slimscroll.min.js"></script>
    <script src="assets/js/jquery.slicknav.min.js"></script>

    <!-- start chart js -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js"></script> -->
    <!-- start highcharts js -->
    <!-- <script src="https://code.highcharts.com/highcharts.js"></script> -->
    <!-- start zingchart js -->
    <!-- <script src="https://cdn.zingchart.com/zingchart.min.js"></script> -->
    <!-- <script>
    zingchart.MODULESDIR = "https://cdn.zingchart.com/modules/";
    ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "ee6b7db5b51705a13dc2339db3edaf6d"];
    </script> -->
    <!-- all line chart activation -->
    <script src="assets/js/line-chart.js"></script>
    <!-- all pie chart -->
    <script src="assets/js/pie-chart.js"></script>
    <!-- others plugins -->
    <script src="assets/js/plugins.js"></script>
    <script src="assets/js/scripts.js"></script>
</body>

</html>

<script type="text/javascript" src="assets/DataTables-1.10.19/media/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="assets/DataTables-1.10.19/media/js/dataTables.bootstrap4.min.js"></script>
<script type="text/javascript">
    function back() {
        window.location.href="pencarian.php";
    }

    $(document).ready(function() {
            $('#listpencarian').DataTable();
    } );
</script>
